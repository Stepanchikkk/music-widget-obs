const DEFAULT_PORT = 4455;
let ws = null;
let wsAuthenticated = false;
let wsConnecting = false;
let lastError = '';
let wsPort = DEFAULT_PORT;
let widgetStyle = 'classic';
let wsPassword = '';
let usePassword = false;
const obsPending = new Map();
let obsReqId = 0;

async function sha256b64(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
async function computeAuth(password, salt, challenge) {
  const secret = await sha256b64(password + salt);
  return await sha256b64(secret + challenge);
}
function obsRequest(requestType, requestData) {
  return new Promise((resolve, reject) => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !wsAuthenticated) { reject(new Error('not connected')); return; }
    const requestId = 'bg' + (++obsReqId);
    obsPending.set(requestId, { resolve, reject });
    try { ws.send(JSON.stringify({ op: 6, d: { requestType, requestId, requestData: requestData || {} } })); }
    catch (e) { obsPending.delete(requestId); reject(e); return; }
    setTimeout(() => { if (obsPending.has(requestId)) { obsPending.delete(requestId); reject(new Error('timeout ' + requestType)); } }, 5000);
  });
}
async function b64utf8(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
async function injectWidgetConfig() {
  if (!wsAuthenticated) return;
  let list;
  try { list = (await obsRequest('GetInputList')).responseData; } catch (e) { return; }
  const inputs = (list && list.inputs) || [];
  const pass = (usePassword && wsPassword) ? await b64utf8(wsPassword) : '';
  const port = String(wsPort).replace(/[^0-9]/g, '');
  for (const inp of inputs) {
    if (inp.inputKind !== 'browser_source') continue;
    let settings;
    try { settings = (await obsRequest('GetInputSettings', { inputName: inp.inputName })).responseData; } catch (e) { continue; }
    const s = (settings && settings.inputSettings) || {};
    const lf = (String(s.local_file || '') + ' ' + String(s.url || '')).toLowerCase();
    if (lf.indexOf('widget.html') === -1) continue;
    let css = String(s.css || '');
    css = css.replace(/\/\*mw-obs\*\/[^]*?}/g, '');
    css += '\n/*mw-obs*/:root{--obs-ws-port:' + port + ';--obs-ws-password-b64:"' + pass + '";}';
    try { await obsRequest('SetInputSettings', { inputName: inp.inputName, inputSettings: { css }, overlay: true }); } catch (e) {}
    try { await obsRequest('PressInputPropertiesButton', { inputName: inp.inputName, propertyName: 'refreshnocache' }); } catch (e) {}
  }
}

let textEnabled = false;
let textSources = [];
let textFormat = '{artist} — {title}';
let textScroll = false;
let textScrollSpeed = 50;
let textGap = 8;
let lastTextValue = '';
let textSourcesCache = [];

function formatText(data) {
  if (!data || data.error) return '';
  return String(textFormat || '{artist} — {title}')
    .replace(/\{artist\}/g, data.artist || '')
    .replace(/\{title\}/g, data.title || '')
    .replace(/\{album\}/g, data.album || '')
    .trim();
}

async function updateTextSource(data) {
  if (!textEnabled || !wsAuthenticated || !textSources.length) return;
  const text = formatText(data);
  const gap = Math.max(0, Math.min(50, Number(textGap) || 0));
  const out = gap > 0 ? text + ' '.repeat(gap) : text;
  if (out === lastTextValue) return;
  lastTextValue = out;
  for (const name of textSources) {
    try { await obsRequest('SetInputSettings', { inputName: name, inputSettings: { text: out }, overlay: true }); } catch (e) {}
  }
}

async function applyTextScroll() {
  if (!wsAuthenticated) return;
  for (const name of textSources) {
    try {
      const fl = (await obsRequest('GetSourceFilterList', { sourceName: name })).responseData;
      const exists = ((fl && fl.filters) || []).some(f => f.filterName === 'MW Scroll');
      if (!exists && !textScroll) continue;
      const settings = { speed_x: Number(textScrollSpeed) || 50, speed_y: 0, loop: true };
      if (!exists) {
        await obsRequest('CreateSourceFilter', { sourceName: name, filterName: 'MW Scroll', filterKind: 'scroll_filter', filterSettings: settings });
      } else {
        await obsRequest('SetSourceFilterSettings', { sourceName: name, filterName: 'MW Scroll', filterSettings: settings });
      }
      await obsRequest('SetSourceFilterEnabled', { sourceName: name, filterName: 'MW Scroll', filterEnabled: textScroll });
    } catch (e) {}
  }
}


const tracks = new Map();
const lastUpdate = new Map();
let lastSource = '';
let currentTrackData = null;
let activeTabId = null;
let reconnectTimer = null;
let connectFailures = 0;
let lastNoMusicSent = 0;
let lastSentKind = '';
let settingsReady = false;
let sentLog = [];

function scheduleConnect() {
  if (reconnectTimer) return;
  var delay = Math.min(300 * Math.pow(2, connectFailures), 5000);
  connectFailures = Math.min(connectFailures + 1, 6);
  reconnectTimer = setTimeout(() => { reconnectTimer = null; connect(); }, delay);
}

function connect() {
  if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
  if (wsConnecting) return;
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;

  wsConnecting = true;

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
          if (!usePassword || !wsPassword) {
            lastError = 'auth_required';
            sock.close();
            if (ws === sock) { ws = null; wsConnecting = false; }
            return;
          }
          try {
            identify.d.authentication = await computeAuth(wsPassword, msg.d.authentication.salt, msg.d.authentication.challenge);
          } catch (e) {
            lastError = 'auth_required';
            sock.close();
            if (ws === sock) { ws = null; wsConnecting = false; }
            return;
          }
        }

        try { sock.send(JSON.stringify(identify)); } catch (e) {
          lastError = 'send_failed';
          sock.close();
          if (ws === sock) { ws = null; wsConnecting = false; }
        }
      } else if (msg.op === 2) {
        wsAuthenticated = true;
        wsConnecting = false;
        connectFailures = 0;
        lastError = '';
        injectWidgetConfig();
        applyTextScroll();
        if (currentTrackData && !currentTrackData.error) updateTextSource(currentTrackData);
        pickAndSend(true);
      } else if (msg.op === 7) {
        const p = obsPending.get(msg.d.requestId);
        if (p) { obsPending.delete(msg.d.requestId); p.resolve(msg.d); }
      } else if (msg.op === 5) {
        if (msg.d.eventType === 'InputCreated') injectWidgetConfig();
      }
    } catch (e) {}
  };

  sock.onclose = (event) => {
    if (ws !== sock) return;
    ws = null;
    wsAuthenticated = false;
    wsConnecting = false;
    if (event.code === 4009) lastError = 'auth_failed';
    else if (event.code && event.code !== 1000 && event.code !== 1006) lastError = 'close_' + event.code;
    if (!lastError && event.code !== 1000) lastError = 'connection_error';
    scheduleConnect();
  };

  sock.onerror = () => {
    if (ws !== sock) return;
    wsConnecting = false;
    try { sock.close(); } catch (e) {}
    ws = null;
    wsAuthenticated = false;
    lastError = 'connection_error';
    scheduleConnect();
  };

  setTimeout(() => {
    if (ws === sock && ws.readyState === WebSocket.CONNECTING) {
      lastError = 'timeout';
      try { sock.close(); } catch (e) {}
      if (ws === sock) { ws = null; wsAuthenticated = false; wsConnecting = false; }
      scheduleConnect();
    }
  }, 4000);
}

function send(data) {
  if (!ws || ws.readyState !== WebSocket.OPEN || !wsAuthenticated) return;
  data._style = widgetStyle;
  sentLog.push({ at: Date.now(), title: data.title || '', artist: data.artist || '', state: data.state || '', error: data.error || '', thumbLen: (data.thumbnail || '').length });
  if (sentLog.length > 8) sentLog.shift();

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
  updateTextSource(data);
}

function isMutedTrack(track) {
  if (!track) return false;
  if (track.tabMuted === true) return true;
  if (track.data && track.data.mutedKnown === false) return false;
  return !!(track.data && track.data.muted);
}

function trackWeight(track) {
  var d = track.data || {};
  var sk = (d.stateKnown === undefined) ? true : !!d.stateKnown;
  var mk = (d.mutedKnown === undefined) ? sk : !!d.mutedKnown;
  var tabMuted = track.tabMuted === true;          // вкладка замьючена средствами Chrome
  var muted = (mk ? !!d.muted : false) || tabMuted;
  var knownMute = mk || tabMuted;
  var base = (d.state === 'playing' ? 2 : 1);
  if (!sk) return base + 3;
  return base + 2 + (knownMute ? (muted ? 0 : 2) : 0);
}

function pickAndSend(force) {
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

  // Прилипчивость: пока текущий источник играет и не замьючен, новый такой же
  // его не перебивает. Смена — только если текущий замолчал/замьючен/встал.
  if (activeTabId != null && tracks.has(activeTabId)) {
    var cur = tracks.get(activeTabId);
    var curStrong = cur.data.state === 'playing' && !isMutedTrack(cur);
    if (curStrong) { best = cur; bestTabId = activeTabId; }
    else if (!best || trackWeight(cur) >= trackWeight(best)) { best = cur; bestTabId = activeTabId; }
  }

  if (best) {
    activeTabId = bestTabId;
    lastSource = best.source;
    currentTrackData = best.data;
    lastSentKind = 'track';
    send(best.data);
  } else {
    activeTabId = null;
    lastSource = '';
    currentTrackData = { error: 'no_music' };
    var now = Date.now();
    if (force || lastSentKind !== 'none' || now - lastNoMusicSent > 15000) {
      lastNoMusicSent = now;
      lastSentKind = 'none';
      send(currentTrackData);
    }
  }
}

function summarizeTrack(d) {
  if (!d) return null;
  var o = {};
  for (var k in d) {
    if (k === 'thumbnail') o.thumbLen = (d.thumbnail || '').length;
    else o[k] = d[k];
  }
  return o;
}

function collectDiag() {
  var out = {
    version: chrome.runtime.getManifest().version,
    ws: { open: !!(ws && ws.readyState === WebSocket.OPEN), auth: wsAuthenticated, connecting: wsConnecting, error: lastError, port: wsPort },
    activeTabId: activeTabId,
    currentTrackData: summarizeTrack(currentTrackData),
    lastSentKind: lastSentKind,
    sentLog: sentLog.slice(),
    tracks: [],
    snapshots: []
  };
  var ids = [];
  tracks.forEach(function(t, id) {
    ids.push(id);
    out.tracks.push({ tabId: id, source: t.source, state: t.data.state, muted: t.data.muted, title: t.data.title, artist: t.data.artist, album: t.data.album, duration: t.data.duration, currentTime: t.data.currentTime, thumbLen: (t.data.thumbnail || '').length, audible: !!t.audible, tabMuted: !!t.tabMuted, discarded: !!t.discarded, ageMs: Date.now() - (lastUpdate.get(id) || 0), active: id === activeTabId });
  });
  return Promise.all(ids.map(function(id) {
    return chrome.tabs.sendMessage(id, { type: 'diag' })
      .then(function(d) { return { tabId: id, diag: d === undefined ? 'no diag handler (old content script?)' : d }; })
      .catch(function(e) { return { tabId: id, diag: 'ERR: ' + (e && e.message ? e.message : 'no response') }; });
  })).then(function(snaps) { out.snapshots = snaps; return out; });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'getTextSources') {
    (async () => {
      try {
        const list = (await obsRequest('GetInputList')).responseData;
        const sources = ((list && list.inputs) || []).filter(i => String(i.inputKind || '').indexOf('text_') === 0).map(i => i.inputName);
        textSourcesCache = sources;
        sendResponse({ ok: true, sources });
      } catch (e) {
        sendResponse({ ok: true, sources: textSourcesCache, cached: true, error: e.message });
      }
    })();
    return true;
  }
  if (msg.type === 'setTextConfig') {
    textEnabled = !!msg.enabled;
    textSources = Array.isArray(msg.sources) ? msg.sources : [];
    textFormat = msg.format || '{artist} — {title}';
    textScroll = !!msg.scroll;
    textScrollSpeed = Number(msg.scrollSpeed) || 50;
    textGap = Math.max(0, Math.min(50, Number(msg.gap) || 0));
    lastTextValue = '';
    chrome.storage.local.set({ textEnabled, textSources, textFormat, textScroll, textScrollSpeed, textGap });
    applyTextScroll();
    if (currentTrackData && !currentTrackData.error) updateTextSource(currentTrackData);
    sendResponse({ ok: true });
    return true;
  }
  if (msg.type === 'mediaSessionUpdate') {
    const tabId = sender.tab?.id;
    if (!tabId) return;
    if (settingsReady) connect();
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
      tracks.set(tabId, {
        data: data,
        source: getHostname(sender.tab?.url || ''),
        playingSince: playingSince,
        pausedAt: pausedAt,
        audible: prev ? prev.audible : undefined,
        tabMuted: prev ? prev.tabMuted : undefined,
        discarded: prev ? prev.discarded : false,
        lastPing: prev ? prev.lastPing : 0
      });
      lastUpdate.set(tabId, Date.now());
      pickAndSend(false);
    });
    return;
  }

  if (msg.type === 'trackEnded') {
    const tabId = sender.tab?.id;
    if (tabId && tracks.has(tabId)) {
      const ending = tracks.get(tabId);
      clearTimeout(ending.removeTimer);
      ending.removeTimer = setTimeout(() => {
        if (tracks.get(tabId) !== ending) return;
        tracks.delete(tabId);
        lastUpdate.delete(tabId);
        if (activeTabId === tabId) activeTabId = null;
        pickAndSend(true);
      }, 1500);
    } else {
      pickAndSend(true);
    }
    return;
  }

  if (msg.type === 'collectDiag') {
    collectDiag().then(function(d) { sendResponse(d); });
    return true;
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
    if (msg.wsPassword !== undefined) wsPassword = msg.wsPassword;
    if (msg.usePassword !== undefined) usePassword = !!msg.usePassword;
    if (ws) { try { ws.close(); } catch (e) {} }
    ws = null;
    wsAuthenticated = false;
    wsConnecting = false;
    connectFailures = 0;
    connect();
    sendResponse({ ok: true });
    return true;
  }

  if (msg.type === 'setStyle') {
    widgetStyle = msg.style;
    chrome.storage.local.set({ widgetStyle: msg.style });
    pickAndSend(true);
    sendResponse({ ok: true });
    return true;
  }
});

chrome.alarms.create('heartbeat', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'heartbeat') {
    connect();
    sweepTabs();
    pickAndSend(true);
  }
});

function getHostname(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

chrome.storage.local.get({ wsPort: DEFAULT_PORT, widgetStyle: 'classic', wsPassword: '', usePassword: false, textEnabled: false, textSources: [], textFormat: '{artist} — {title}', textScroll: false, textScrollSpeed: 50, textGap: 8 }, (items) => {
  wsPort = items.wsPort;
  widgetStyle = items.widgetStyle || 'classic';
  wsPassword = items.wsPassword || '';
  usePassword = !!items.usePassword;
  textEnabled = !!items.textEnabled;
  textSources = Array.isArray(items.textSources) ? items.textSources : [];
  textFormat = items.textFormat || '{artist} — {title}';
  textScroll = !!items.textScroll;
  textScrollSpeed = Number(items.textScrollSpeed) || 50;
  textGap = Math.max(0, Math.min(50, Number(items.textGap) || 0));
  settingsReady = true;
  connect();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tracks.has(tabId)) {
    tracks.delete(tabId);
    lastUpdate.delete(tabId);
    if (activeTabId === tabId) activeTabId = null;
    pickAndSend(true);
  }
});

// Обновления вкладки: выгрузка (discarded) и наличие звука. Навигацию здесь
// не трогаем — иначе любой переход по странице даёт ложную заглушку.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!tracks.has(tabId)) return;
  const track = tracks.get(tabId);
  if (changeInfo.discarded === true) {
    if (track.data.state === 'playing') { track.data.state = 'paused'; track.pausedAt = track.pausedAt || Date.now(); }
    track.discarded = true;
    pickAndSend(false);
  }
  if (changeInfo.audible !== undefined) track.audible = changeInfo.audible;
  if (changeInfo.mutedInfo) track.tabMuted = !!changeInfo.mutedInfo.muted;
});

// Пока вкладка существует — держим её последнее состояние. Молчание не смерть.
function sweepTabs() {
  const now = Date.now();
  tracks.forEach((track, tabId) => {
    chrome.tabs.get(tabId).then((tab) => {
      track.audible = !!tab.audible;
      track.tabMuted = !!(tab.mutedInfo && tab.mutedInfo.muted);
      track.discarded = !!tab.discarded;
      if (track.discarded && track.data.state === 'playing') {
        track.data.state = 'paused';
        track.pausedAt = track.pausedAt || now;
      }
      if (now - (lastUpdate.get(tabId) || 0) > 4000) {
        if (!track.audible && !track.tabMuted && track.data.state === 'playing') {
          track.data.state = 'paused';
          track.pausedAt = track.pausedAt || now;
        }
        pingTab(tabId, track, now);
      }
    }).catch(() => {
      tracks.delete(tabId);
      lastUpdate.delete(tabId);
      if (activeTabId === tabId) activeTabId = null;
    });
  });
}

function pingTab(tabId, track, now) {
  if (track.discarded) return;
  if (now - (track.lastPing || 0) < 10000) return;
  track.lastPing = now;
  chrome.tabs.sendMessage(tabId, { type: 'ping' }).catch(() => {
    chrome.scripting.executeScript({ target: { tabId: tabId }, files: ['content.js'] }).catch(() => {});
  });
}

setInterval(() => {
  sweepTabs();
  pickAndSend(false);
}, 4000);

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