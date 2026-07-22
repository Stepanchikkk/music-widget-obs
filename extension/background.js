const DEFAULT_PORT = 4455;
let ws = null;
let wsAuthenticated = false;
let wsConnecting = false;
let lastError = '';
let wsPort = DEFAULT_PORT;
let widgetStyle = 'classic';

const tracks = new Map();
const lastUpdate = new Map();
let sentKey = '';
let sentTrackKey = '';
let lastSource = '';
let currentTrackData = null;

function connect() {
  if (wsConnecting) return;
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;

  wsConnecting = true;
  lastError = '';

  if (ws) { try { ws.close(); } catch (e) {} }

  const sock = new WebSocket('ws://127.0.0.1:' + wsPort);
  ws = sock;
  wsAuthenticated = false;

  sock.onopen = () => {};

  sock.onmessage = async (event) => {
    if (ws !== sock) return;
    try {
      const msg = JSON.parse(event.data);

      if (msg.op === 0) {
        const serverRpcVersion = msg.d.rpcVersion;
        const identify = { op: 1, d: { rpcVersion: serverRpcVersion, eventSubscriptions: 0x7FFFFFFF } };

        if (msg.d.authentication) {
          lastError = 'auth_required';
          sock.close();
          if (ws === sock) { ws = null; wsConnecting = false; }
          return;
        }

        try { sock.send(JSON.stringify(identify)); } catch (e) {
          lastError = 'send_failed';
          sock.close();
          if (ws === sock) { ws = null; wsConnecting = false; }
        }
      } else if (msg.op === 2) {
        wsAuthenticated = true;
        wsConnecting = false;
        sentKey = '';
        sentTrackKey = '';
        pickAndSend();
      }
    } catch (e) {}
  };

  sock.onclose = (event) => {
    if (ws !== sock) return;
    ws = null;
    wsAuthenticated = false;
    wsConnecting = false;
    if (event.code && event.code !== 1000 && event.code !== 1006) lastError = 'close_' + event.code;
    connect();
  };

  sock.onerror = () => {
    if (ws !== sock) return;
    wsConnecting = false;
    try { sock.close(); } catch (e) {}
    ws = null;
    wsAuthenticated = false;
    lastError = 'connection_error';
    connect();
  };

  setTimeout(() => {
    if (ws === sock && ws.readyState === WebSocket.CONNECTING) {
      lastError = 'timeout';
      try { sock.close(); } catch (e) {}
      if (ws === sock) { ws = null; wsAuthenticated = false; wsConnecting = false; }
      connect();
    }
  }, 2000);
}

function send(data) {
  if (!ws || ws.readyState !== WebSocket.OPEN || !wsAuthenticated) return;
  data._style = widgetStyle;

  try {
    ws.send(JSON.stringify({
      op: 6,
      d: {
        requestType: 'BroadcastCustomEvent',
        requestId: '' + Date.now() + Math.random(),
        requestData: { eventData: data }
      }
    }));
  } catch (e) {}
}

function trackWeight(track) {
  return (track.data.state === 'playing' ? 2 : 1) + (track.data.muted ? 0 : 2);
}

function pickAndSend() {
  const now = Date.now();
  for (const [tabId] of tracks) {
    if (now - (lastUpdate.get(tabId) || 0) > 65000) {
      tracks.delete(tabId);
      lastUpdate.delete(tabId);
    }
  }

  var best = null;
  var bestTabId = null;
  for (const [tabId, track] of tracks) {
    if (!best) { best = track; bestTabId = tabId; continue; }
    var w = trackWeight(track);
    var bw = trackWeight(best);
    if (w > bw) { best = track; bestTabId = tabId; continue; }
    if (w < bw) continue;
    var ts = track.data.state === 'playing' ? (track.playingSince || 0) : (track.pausedAt || 0);
    var bts = best.data.state === 'playing' ? (best.playingSince || 0) : (best.pausedAt || 0);
    if (ts > bts) { best = track; bestTabId = tabId; continue; }
    if (ts < bts) continue;
    if ((lastUpdate.get(tabId) || 0) > (lastUpdate.get(bestTabId) || 0)) {
      best = track;
      bestTabId = tabId;
    }
  }

  if (best) {
    console.log('MW bg send thumb:', (best.data.thumbnail||'').slice(0,60), 'source:', best.source);
    lastSource = best.source;
    currentTrackData = best.data;
    send(best.data);
  } else if (tracks.size === 0) {
    if (sentKey !== 'no_music') {
      sentKey = 'no_music';
      lastSource = '';
      currentTrackData = { error: 'no_music' };
      send(currentTrackData);
    }
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'mediaSessionUpdate') {
    const tabId = sender.tab?.id;
    if (!tabId) return;
    console.log('MW bg recv tab', tabId, 'thumb:', (msg.data.thumbnail||'').slice(0,60));
    chrome.tabs.get(tabId, () => {
      if (chrome.runtime.lastError) return;
      var prev = tracks.get(tabId);
      var data = msg.data;
      var playingSince = 0;
      if (data.state === 'playing' && (!prev || prev.data.state !== 'playing'))
        playingSince = Date.now();
      else if (prev)
        playingSince = prev.playingSince || 0;
      var pausedAt = 0;
      if (data.state === 'paused' && (!prev || prev.data.state !== 'paused'))
        pausedAt = Date.now();
      else if (prev)
        pausedAt = prev.pausedAt || 0;
      tracks.set(tabId, { data: data, source: getHostname(sender.tab?.url || ''), playingSince: playingSince, pausedAt: pausedAt });
      lastUpdate.set(tabId, Date.now());
      pickAndSend();
    });
    return;
  }

  if (msg.type === 'trackEnded') {
    const tabId = sender.tab?.id;
    if (tabId) {
      tracks.delete(tabId);
      lastUpdate.delete(tabId);
    }
    pickAndSend();
    return;
  }

  if (msg.type === 'getStatus') {
    sendResponse({
      connected: ws !== null && wsAuthenticated,
      track: currentTrackData && !currentTrackData.error ? currentTrackData : null,
      source: lastSource,
      tabs: tracks.size,
      style: widgetStyle,
      debug: {
        wsState: ws ? ws.readyState : -1,
        wsAuth: wsAuthenticated,
        wsConn: wsConnecting,
        error: lastError,
        port: wsPort
      }
    });
    return true;
  }

  if (msg.type === 'reconnect') {
    if (msg.wsPort !== undefined) wsPort = msg.wsPort;
    if (ws) { try { ws.close(); } catch (e) {} }
    ws = null;
    wsAuthenticated = false;
    wsConnecting = false;
    sentKey = '';
    connect();
    sendResponse({ ok: true });
    return true;
  }

  if (msg.type === 'setStyle') {
    widgetStyle = msg.style;
    chrome.storage.local.set({ widgetStyle: msg.style });
    sentKey = '';
    sentTrackKey = '';
    pickAndSend();
    sendResponse({ ok: true });
    return true;
  }
});

chrome.alarms.create('heartbeat', { periodInMinutes: 1 / 12 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'heartbeat') {
    connect();
    if (currentTrackData) send(currentTrackData);
  }
});

function getHostname(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

chrome.storage.local.get({ wsPort: DEFAULT_PORT, widgetStyle: 'classic' }, (items) => {
  wsPort = items.wsPort;
  widgetStyle = items.widgetStyle || 'classic';
});

connect();

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tracks.has(tabId)) {
    tracks.delete(tabId);
    lastUpdate.delete(tabId);
    pickAndSend();
  }
});

// Inject content.js into all existing tabs so they don't need F5
function injectContent(tabs) {
  for (const tab of tabs) {
    if (!tab.id) continue;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }).catch(() => {});
  }
}
chrome.tabs.query({}, (tabs) => {
  if (tabs && tabs.length > 0) { injectContent(tabs); return; }
  chrome.windows.getAll({ populate: true }, (windows) => {
    const all = [];
    for (const w of windows) { if (w.tabs) all.push(...w.tabs); }
    if (all.length > 0) injectContent(all);
  });
});