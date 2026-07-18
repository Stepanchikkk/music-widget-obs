let lang = 'ru';

const L10N = {
  ru: {
    title: 'Music Widget OBS',
    step1: '<strong>\u0421\u0435\u0440\u0432\u0438\u0441</strong> \u2192 <strong>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 WebSocket</strong>',
    step2: '\u041f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0433\u0430\u043b\u043e\u0447\u043a\u0443 <strong>\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0441\u0435\u0440\u0432\u0435\u0440 WebSocket</strong>, \u0441\u043d\u0438\u043c\u0438\u0442\u0435 \u0433\u0430\u043b\u043e\u0447\u043a\u0443 <strong>\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0432\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442</strong>, \u043f\u043e\u0440\u0442 <code>4455</code>, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 <strong>OK</strong>',
    step3: '<strong>\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a</strong> \u2192 <strong>\u0411\u0440\u0430\u0443\u0437\u0435\u0440</strong> \u2192 <strong>\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0439</strong> (\u043c\u043e\u0436\u043d\u043e \u0437\u0430\u0434\u0430\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435) \u2192 \u043f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0433\u0430\u043b\u043e\u0447\u043a\u0443 <strong>\u041b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0444\u0430\u0439\u043b</strong> \u2192 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 <code>widget.html</code> \u0438\u0437 \u043f\u0430\u043f\u043a\u0438 <code>music-widget-obs</code>',
    footer: '\u0420\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u043d\u0430 GitHub',
    sectionTitle1: '\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a OBS',
    sectionTitle2: '\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0433\u0440\u0430\u0435\u0442',
    sectionTitle3: '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b WebSocket',
    stepsTitle: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 OBS',
    portLabel: '\u041f\u043e\u0440\u0442',
    saveBtn: '\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0438 \u043f\u0435\u0440\u0435\u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f',
    statusConnected: 'WebSocket: \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d',
    statusDisconnected: 'WebSocket: \u043d\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0451\u043d',
    statusConnecting: 'WebSocket: \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435...',
    statusChecking: '\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430...',
    auth_required: '\u0412 OBS \u0432\u043a\u043b\u044e\u0447\u0451\u043d \u0432\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 (\u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f). \u041e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u0421\u0435\u0440\u0432\u0438\u0441 \u2192 \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 WebSocket \u0438 \u0441\u043d\u0438\u043c\u0438\u0442\u0435 \u0433\u0430\u043b\u043e\u0447\u043a\u0443 "\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0432\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442"',
    connection_error: '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u043a OBS. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c \u0447\u0442\u043e OBS \u0437\u0430\u043f\u0443\u0449\u0435\u043d \u0438 WebSocket \u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u043a\u043b\u044e\u0447\u0451\u043d, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0440\u0442',
    timeout: 'OBS \u043d\u0435 \u043e\u0442\u0432\u0435\u0447\u0430\u0435\u0442. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c \u0447\u0442\u043e OBS \u0437\u0430\u043f\u0443\u0449\u0435\u043d \u0438 WebSocket \u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u043a\u043b\u044e\u0447\u0451\u043d, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0440\u0442',
    send_failed: '\u041e\u0448\u0438\u0431\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u0434\u0430\u043d\u043d\u044b\u0445. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0440\u0442 WebSocket \u0441\u0435\u0440\u0432\u0435\u0440\u0430',
    close_: '\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u043e. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0440\u0442 \u0438 \u0447\u0442\u043e \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f \u0432\u044b\u043a\u043b\u044e\u0447\u0435\u043d\u0430 \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445 WebSocket \u0441\u0435\u0440\u0432\u0435\u0440\u0430',
    genericError: '\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0447\u0442\u043e OBS \u0437\u0430\u043f\u0443\u0449\u0435\u043d \u0438 WebSocket \u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u043a\u043b\u044e\u0447\u0451\u043d (\u0421\u0435\u0440\u0432\u0438\u0441 \u2192 \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 WebSocket)',
    noTabs: '\u041d\u0435\u0442 \u0432\u043a\u043b\u0430\u0434\u043e\u043a \u0441 \u043c\u0435\u0434\u0438\u0430. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c \u0447\u0442\u043e \u043c\u0443\u0437\u044b\u043a\u0430 \u0438\u0433\u0440\u0430\u0435\u0442 \u0447\u0435\u0440\u0435\u0437 YouTube, \u042f\u043d\u0434\u0435\u043a\u0441.\u041c\u0443\u0437\u044b\u043a\u0443 \u0438\u043b\u0438 \u0434\u0440\u0443\u0433\u043e\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0441 MediaSession API',
    waitingTrack: '\u0412\u043a\u043b\u0430\u0434\u043e\u043a \u0441 \u043c\u0435\u0434\u0438\u0430: {tabs}, \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u0435 \u0442\u0440\u0435\u043a\u0430...',
    retryIn: ' \u2022 \u043f\u043e\u0432\u0442\u043e\u0440 \u0447\u0435\u0440\u0435\u0437 {secs}\u0441',
    styleTitle: '\u0421\u0442\u0438\u043b\u044c \u0432\u0438\u0434\u0436\u0435\u0442\u0430',
    styleClassic: '\u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0438\u0439',
    styleCompact: '\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439',
  },
  en: {
    title: 'Music Widget OBS',
    step1: '<strong>Services</strong> \u2192 <strong>WebSocket Server Settings</strong>',
    step2: 'Check <strong>Enable WebSocket server</strong>, uncheck <strong>Require Authentication</strong>, port <code>4455</code>, click <strong>OK</strong>',
    step3: '<strong>Add Source</strong> \u2192 <strong>Browser</strong> \u2192 <strong>Create New</strong> \u2192 check <strong>Local File</strong> \u2192 select <code>widget.html</code> from <code>music-widget-obs</code> folder',
    footer: 'Project repository on GitHub',
    sectionTitle1: 'OBS Connection',
    sectionTitle2: 'Now Playing',
    sectionTitle3: 'WebSocket Settings',
    stepsTitle: 'OBS Setup',
    portLabel: 'Port',
    saveBtn: 'Apply & Reconnect',
    statusConnected: 'WebSocket: connected',
    statusDisconnected: 'WebSocket: disconnected',
    statusConnecting: 'WebSocket: connecting...',
    statusChecking: 'Checking...',
    auth_required: 'OBS has authentication enabled. Open Services \u2192 WebSocket Server Settings and uncheck Require Authentication',
    connection_error: 'Failed to connect to OBS. Make sure OBS is running and WebSocket server is enabled, check the port',
    timeout: 'OBS is not responding. Make sure OBS is running and WebSocket server is enabled, check the port',
    send_failed: 'Failed to send data. Check the WebSocket server port',
    close_: 'Connection closed. Check the port and make sure authentication is disabled in WebSocket Server Settings',
    genericError: 'Make sure OBS is running and WebSocket server is enabled (Services \u2192 WebSocket Server Settings)',
    noTabs: 'No media tabs found. Make sure music is playing via YouTube, Yandex.Music, or another service with MediaSession API',
    waitingTrack: 'Media tabs: {tabs}, waiting for track...',
    retryIn: ' \u2022 retry in {secs}s',
    styleTitle: 'Widget Style',
    styleClassic: 'Classic',
    styleCompact: 'Compact',
  }
};

// DOM refs
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const statusHint = document.getElementById('statusHint');
const trackSection = document.getElementById('trackSection');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackSource = document.getElementById('trackSource');
const portInput = document.getElementById('portInput');
const saveBtn = document.getElementById('saveBtn');
const langSwitch = document.getElementById('langSwitch');
const styleSelect = document.getElementById('styleSelect');

const STYLES = [
  { id: 'classic', key: 'styleClassic' },
  { id: 'compact', key: 'styleCompact' },
];

function T(key, vars) {
  let s = (L10N[lang] && L10N[lang][key]) || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, v);
    }
  }
  return s;
}

function applyLang() {
  const ver = chrome.runtime.getManifest().version;
  document.querySelector('.header h1').textContent = T('title');
  document.querySelector('.header p').textContent = 'v' + ver + (lang === 'ru' ? ' \u2014 трансляция музыки в OBS' : ' \u2014 stream music to OBS');
  document.querySelectorAll('.step-text')[0].innerHTML = T('step1');
  document.querySelectorAll('.step-text')[1].innerHTML = T('step2');
  document.querySelectorAll('.step-text')[2].innerHTML = T('step3');
  document.querySelector('.footer-link a').textContent = T('footer');
  document.querySelectorAll('.section-title')[0].textContent = T('sectionTitle1');
  document.querySelectorAll('.section-title')[1].textContent = T('sectionTitle2');
  document.querySelectorAll('.section-title')[2].textContent = T('sectionTitle3');
  document.querySelector('.steps .section-title').textContent = T('stepsTitle');
  document.querySelector('.field-row label').textContent = T('portLabel');
  saveBtn.textContent = T('saveBtn');
  langSwitch.textContent = lang === 'ru' ? 'EN' : 'RU';
  document.getElementById('styleSectionTitle').textContent = T('styleTitle');
  styleSelect.innerHTML = STYLES.map(s => `<option value="${s.id}">${T(s.key)}</option>`).join('');
  styleSelect.value = currentStyle;
}

function loadLang() {
  chrome.storage.local.get({ lang: 'ru' }, (items) => {
    lang = items.lang;
    applyLang();
  });
}

function saveLang(l) {
  lang = l;
  chrome.storage.local.set({ lang: l });
  applyLang();
}

langSwitch.addEventListener('click', () => {
  saveLang(lang === 'ru' ? 'en' : 'ru');
});

function updateStatus(status, alarm) {
  if (status.style && status.style !== currentStyle) {
    currentStyle = status.style;
    styleSelect.value = status.style;
  }
  if (status.connected) {
    statusDot.className = 'dot connected';
    if (status.track) {
      statusText.innerHTML = T('statusConnected');
      trackSection.style.display = 'block';
      trackTitle.textContent = status.track.title || '\u2014';
      trackArtist.textContent = status.track.artist || '\u2014';
      trackSource.textContent = status.source || '';
    } else {
      statusText.innerHTML = T('statusConnected');
      trackSection.style.display = 'none';
    }
    statusHint.textContent = '';
  } else {
    statusDot.className = 'dot disconnected';
    statusText.innerHTML = T('statusDisconnected');
    trackSection.style.display = 'none';

    const d = status.debug;
    let msg = d && d.error ? d.error : (status.reason || '');
    if (msg === 'auth_required') msg = T('auth_required');
    else if (msg === 'connection_error') msg = T('connection_error') + ' (' + (d ? d.port : '') + ')';
    else if (msg === 'timeout') msg = T('timeout') + ' (' + (d ? d.port : '') + ')';
    else if (msg === 'send_failed') msg = T('send_failed');
    else if (msg.startsWith && msg.startsWith('close_')) msg = T('close_') + ' (' + (d ? d.port : '') + ')';
    if (!msg) msg = T('genericError');
    if (alarm) {
      const secs = Math.max(0, Math.round((alarm.scheduledTime - Date.now()) / 1000));
      if (secs > 0) msg += T('retryIn', { secs });
    }
    statusHint.textContent = msg;
  }

  if (status.connected && !status.track && status.tabs !== undefined) {
    if (status.tabs === 0) {
      statusHint.textContent = T('noTabs');
    } else {
      statusHint.textContent = T('waitingTrack', { tabs: status.tabs });
    }
  }
}

async function checkStatus() {
  try {
    const [response, alarm] = await Promise.all([
      chrome.runtime.sendMessage({ type: 'getStatus' }),
      chrome.alarms.get('heartbeat')
    ]);
    if (response) {
      updateStatus(response, alarm);
    } else {
      updateStatus({ connected: false, reason: 'error' }, alarm);
    }
  } catch (e) {
    updateStatus({ connected: false, reason: 'error' });
  }
}

function loadSettings() {
  chrome.storage.local.get({ wsPort: '4455' }, (items) => {
    portInput.value = items.wsPort;
  });
}

function saveSettings() {
  const port = portInput.value.trim() || '4455';
  chrome.storage.local.set({ wsPort: port }, () => {
    statusDot.className = 'dot connecting';
    statusText.textContent = T('statusConnecting');
    statusHint.textContent = '';
    chrome.runtime.sendMessage({ type: 'reconnect', wsPort: port });
  });
}

saveBtn.addEventListener('click', saveSettings);

portInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveSettings();
});

let currentStyle = 'classic';

loadSettings();
loadLang();
checkStatus();
setInterval(checkStatus, 2000);

chrome.storage.local.get({ widgetStyle: 'classic' }, (items) => {
  currentStyle = items.widgetStyle || 'classic';
  styleSelect.value = currentStyle;
});

styleSelect.addEventListener('change', () => {
  const style = styleSelect.value;
  if (style === currentStyle) return;
  currentStyle = style;
  chrome.storage.local.set({ widgetStyle: style });
  chrome.runtime.sendMessage({ type: 'setStyle', style });
});
