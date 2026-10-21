let lang = 'ru';

const L10N = {
  ru: {
    title: 'Music Widget OBS',
    step1: '<strong>\u0421\u0435\u0440\u0432\u0438\u0441</strong> \u2192 <strong>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 WebSocket</strong>',
    step2: 'Поставьте галочку <strong>Включить сервер WebSocket</strong>, порт <code>4455</code>. Если включён пароль — введите его в параметрах WebSocket ниже.',
    step3: '<strong>\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a</strong> \u2192 <strong>\u0411\u0440\u0430\u0443\u0437\u0435\u0440</strong> \u2192 <strong>\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0439</strong> (\u043c\u043e\u0436\u043d\u043e \u0437\u0430\u0434\u0430\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435) \u2192 \u043f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0433\u0430\u043b\u043e\u0447\u043a\u0443 <strong>\u041b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0444\u0430\u0439\u043b</strong> \u2192 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 <code>widget.html</code> \u0438\u0437 \u043f\u0430\u043f\u043a\u0438 <code>music-widget-obs</code>',
    footer: '\u0420\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u043d\u0430 GitHub',
    updateBar: 'Доступно обновление {ver}',
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
    auth_required: 'OBS требует пароль. Включите «Использовать пароль» и введите пароль WebSocket в параметрах ниже.',
    auth_failed: 'Неверный пароль OBS WebSocket. Проверьте пароль в параметрах ниже.',
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
    styleGlass: '\u0421\u0442\u0435\u043a\u043b\u044f\u043d\u043d\u044b\u0439',
    styleGlassCompact: 'Компактный стеклянный',
    styleMinimal: '\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u044b\u0439',
    styleStereo: '\u041c\u0430\u0433\u043d\u0438\u0442\u043e\u043b\u0430',
    styleFallout: 'Fallout',
  },
  en: {
    title: 'Music Widget OBS',
    step1: '<strong>Services</strong> \u2192 <strong>WebSocket Server Settings</strong>',
    step2: 'Check <strong>Enable WebSocket server</strong>, port <code>4455</code>. If a password is enabled, enter it in the WebSocket settings below.',
    step3: '<strong>Add Source</strong> \u2192 <strong>Browser</strong> \u2192 <strong>Create New</strong> \u2192 check <strong>Local File</strong> \u2192 select <code>widget.html</code> from <code>music-widget-obs</code> folder',
    footer: 'Project repository on GitHub',
    updateBar: 'Update {ver} available',
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
    auth_required: 'OBS requires a password. Enable "Use password" and enter the WebSocket password below.',
    auth_failed: 'Wrong OBS WebSocket password. Check it in the settings below.',
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
    styleGlass: 'Glass',
    styleGlassCompact: 'Compact Glass',
    styleMinimal: 'Minimal',
    styleStereo: 'Car Stereo',
    styleFallout: 'Fallout',
  }
};

// DOM refs
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const statusHint = document.getElementById('statusHint');
const trackSection = document.getElementById('trackSection');
const trackSectionTitle = document.getElementById('trackSectionTitle');
const trackSource = document.getElementById('trackSource');
const saveBtn = document.getElementById('saveBtn');
const portInput = document.getElementById('portInput');
const usePasswordInput = document.getElementById('usePassword');
const passwordInput = document.getElementById('passwordInput');
const passwordRow = document.getElementById('passwordRow');
const textEnabledInput = document.getElementById('textEnabled');
const textCustomFormatRow = document.getElementById('textCustomFormatRow');
const textCustomSepRow = document.getElementById('textCustomSepRow');
const textCustomFormat = document.getElementById('textCustomFormat');
const textCustomSep = document.getElementById('textCustomSep');
const textPreview = document.getElementById('textPreview');
const textScrollInput = document.getElementById('textScroll');
const textScrollSpeedInput = document.getElementById('textScrollSpeed');
const textGapInput = document.getElementById('textGap');
const textSaveBtn = document.getElementById('textSave');
const textHint = document.getElementById('textHint');
const textSummaryMeta = document.getElementById('textSummaryMeta');
const textSrcCount = document.getElementById('textSrcCount');
const textSrcPop = document.getElementById('textSrcPop');
const textFormatDD = document.getElementById('textFormatDD');
const textFormatSummary = document.getElementById('textFormatSummary');
const textFormatOptions = document.getElementById('textFormatOptions');
const textSepDD = document.getElementById('textSepDD');
const textSepSummary = document.getElementById('textSepSummary');
const textSepOptions = document.getElementById('textSepOptions');
const TEXT_FORMATS = [
  { value: 'a1', label: 'Artist — Title' },
  { value: 'a2', label: 'Title — Artist' },
  { value: 'a3', label: 'Artist — Title (album)' },
  { value: 'a4', label: 'Title (artist)' },
  { value: 'custom', label: 'Другой…' }
];
const TEXT_SEPS = [
  { value: '—', label: '—' },
  { value: '·', label: '·' },
  { value: '|', label: '|' },
  { value: '/', label: '/' },
  { value: '•', label: '•' },
  { value: 'custom', label: 'Свой…' }
];
let textFormatValue = 'a1';
let textSepValue = '—';
let savedTextSources = [];
let textSourcesCache = [];
let textLastConnected = false;
const TEXT_PRESETS = {
  a1: '{artist} — {title}',
  a2: '{title} — {artist}',
  a3: '{artist} — {title} ({album})',
  a4: '{title} ({artist})'
};
const langSwitch = document.getElementById('langSwitch');
const styleDropdown = document.getElementById('styleDropdown');
const styleSummary = document.getElementById('styleSummary');
const styleOptions = document.getElementById('styleOptions');
const diagLink = document.getElementById('diagLink');
const updateBar = document.getElementById('updateBar');
const updateText = document.getElementById('updateText');

const STYLES = [
  { id: 'classic', key: 'styleClassic' },
  { id: 'compact', key: 'styleCompact' },
  { id: 'glass', key: 'styleGlass' },
  { id: 'glass-compact', key: 'styleGlassCompact' },
  { id: 'minimal', key: 'styleMinimal' },
  { id: 'stereo', key: 'styleStereo' },
  { id: 'fallout', key: 'styleFallout' },
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

function renderUpdateBar() {
  if (!updateBar) return;
  if (latestVersion) {
    updateText.textContent = T('updateBar', { ver: latestVersion });
    updateBar.classList.add('show');
  } else {
    updateBar.classList.remove('show');
  }
}

let currentStyle = 'classic';
let latestVersion = '';
let releaseUrl = 'https://github.com/Stepanchikkk/music-widget-obs/releases/latest';
let lastTrack = null;
let lastConnected = false;

function sendToPreview(track, connected) {
  lastTrack = track;
  lastConnected = !!connected;
  const frame = document.getElementById('previewFrame');
  if (frame && frame.contentWindow) {
    frame.contentWindow.postMessage({ type: 'trackData', payload: track ? { ...track, _style: currentStyle } : null, connected: !!connected }, '*');
  }
}

function applyPreviewStyle(style) {
  const frame = document.getElementById('previewFrame');
  if (frame && frame.contentWindow) {
    frame.contentWindow.postMessage({ type: 'setStyle', style }, '*');
  }
}

function initPreviewFrame() {
  const frame = document.getElementById('previewFrame');
  frame.addEventListener('load', () => {
    if (lastTrack !== undefined) sendToPreview(lastTrack, lastConnected);
    applyPreviewStyle(currentStyle);
  });
  frame.src = chrome.runtime.getURL('preview.html') + '?preview=1';
}

function applyLang() {
  const ver = chrome.runtime.getManifest().version;
  document.querySelector('.header h1').textContent = T('title');
  document.querySelector('.header p').textContent = 'v' + ver + (lang === 'ru' ? ' \u2014 трансляция музыки в OBS' : ' \u2014 stream music to OBS');
  document.querySelectorAll('.step-text')[0].innerHTML = T('step1');
  document.querySelectorAll('.step-text')[1].innerHTML = T('step2');
  document.querySelectorAll('.step-text')[2].innerHTML = T('step3');
  document.querySelector('.footer-link a').textContent = T('footer');
  if (diagLink) diagLink.textContent = T('diagLink');
  document.querySelectorAll('.section-title')[0].textContent = T('sectionTitle1');
  document.querySelectorAll('.section-title')[1].textContent = T('sectionTitle2');
  document.querySelectorAll('.section-title')[2].textContent = T('sectionTitle3');
  document.querySelector('.steps .section-title').textContent = T('stepsTitle');
  document.querySelector('.field-row label').textContent = T('portLabel');
  saveBtn.textContent = T('saveBtn');
  langSwitch.textContent = lang === 'ru' ? 'EN' : 'RU';
  document.getElementById('styleSectionTitle').textContent = T('styleTitle');
  buildStyleOptions();
  renderUpdateBar();
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

function updateStatus(status) {
  if (status.style && status.style !== currentStyle) {
    currentStyle = status.style;
    updateStyleUI();
  }
  if (status.connected && !textLastConnected) loadTextSources();
  textLastConnected = !!status.connected;
  if (status.connected) {
    statusDot.className = 'dot connected';
    trackSection.hidden = false;
    if (status.track) {
      statusText.innerHTML = T('statusConnected');
      trackSource.textContent = status.source || '';
      sendToPreview(status.track, true);
    } else {
      statusText.innerHTML = T('statusConnected');
      trackSource.textContent = '—';
      sendToPreview(null, true);
    }
    statusHint.textContent = '';
  } else {
    statusDot.className = 'dot disconnected';
    statusText.innerHTML = T('statusDisconnected');
    trackSection.hidden = false;
    trackSource.textContent = '';
    sendToPreview(null, false);

    const d = status.debug;
    let msg = d && d.error ? d.error : (status.reason || '');
    if (msg === 'auth_required') msg = T('auth_required');
    else if (msg === 'auth_failed') msg = T('auth_failed');
    else if (msg === 'connection_error') msg = T('connection_error') + ' (' + (d ? d.port : '') + ')';
    else if (msg === 'timeout') msg = T('timeout') + ' (' + (d ? d.port : '') + ')';
    else if (msg === 'send_failed') msg = T('send_failed');
    else if (msg.startsWith && msg.startsWith('close_')) msg = T('close_') + ' (' + (d ? d.port : '') + ')';
    if (!msg) msg = T('genericError');
    statusHint.textContent = msg;
  }

  if (status.connected && !status.track && status.tabs !== undefined) {
    if (status.tabs === 0) {
      statusHint.textContent = T('noTabs');
    } else {
      statusHint.textContent = T('waitingTrack', { tabs: status.tabs });
    }
  }
  renderTextPreview();
}

async function checkStatus() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'getStatus' });
    if (response) {
      updateStatus(response);
    } else {
      updateStatus({ connected: false, reason: 'error' });
    }
  } catch (e) {
    updateStatus({ connected: false, reason: 'error' });
  }
}

function escHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function loadSettings() {
  chrome.storage.local.get({ wsPort: '4455', wsPassword: '', usePassword: false, textEnabled: false, textSources: [], textFormat: '{artist} — {title}', textPreset: '', textSep: '—', textCustomFormat: '{artist} — {title}', textCustomSep: ' — ', textScroll: false, textScrollSpeed: 50 }, (items) => {
    portInput.value = items.wsPort;
    usePasswordInput.checked = !!items.usePassword;
    passwordInput.value = items.wsPassword || '';
    passwordRow.hidden = !items.usePassword;
    textEnabledInput.checked = !!items.textEnabled;
    const preset = items.textPreset || inferTextPreset(items.textFormat || '{artist} — {title}');
    textFormatValue = preset;
    textSepValue = items.textSep || '—';
    renderTextDropdowns();
    if (preset === 'custom' && !items.textPreset) textCustomFormat.value = items.textFormat || '{artist} — {title}';
    else textCustomFormat.value = items.textCustomFormat || '{artist} — {title}';
    textCustomSep.value = items.textCustomSep || ' — ';
    textScrollInput.checked = !!items.textScroll;
    textScrollSpeedInput.value = items.textScrollSpeed || 50;
  textGapInput.value = items.textGap ?? 8;
    savedTextSources = Array.isArray(items.textSources) ? items.textSources : [];
    updateTextFormatUI();
    updateTextMeta();
    loadTextSources();
  });
}

function loadTextSources() {
  if (!textSrcPop) return;
  textSrcPop.innerHTML = '<div class="src-item">Загрузка...</div>';
  chrome.runtime.sendMessage({ type: 'getTextSources' }, (resp) => {
    if (!resp || !resp.ok) {
      textSrcPop.innerHTML = '<div class="src-item">Нет соединения с OBS</div><button class="btn btn-secondary text-src-refresh" id="textSrcRefresh">Обновить</button>';
      bindTextSrcRefresh();
      updateTextSrcCount();
      updateTextMeta();
      return;
    }
    textSourcesCache = resp.sources || [];
    if (!textSourcesCache.length) {
      textSrcPop.innerHTML = '<div class="src-item">Text-источников нет. Добавьте Text (GDI+) в OBS.</div><button class="btn btn-secondary text-src-refresh" id="textSrcRefresh">Обновить</button>';
      bindTextSrcRefresh();
      updateTextSrcCount();
      updateTextMeta();
      return;
    }
    textSrcPop.innerHTML = textSourcesCache.map((n) => {
      const checked = savedTextSources.indexOf(n) !== -1 ? ' checked' : '';
      return '<label class="src-item"><input type="checkbox" data-source="' + escHtml(n) + '"' + checked + '> <span>' + escHtml(n) + '</span></label>';
    }).join('') + '<button class="btn btn-secondary text-src-refresh" id="textSrcRefresh">Обновить</button>';
    textSrcPop.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', updateTextSrcCount);
    });
    bindTextSrcRefresh();
    updateTextSrcCount();
    updateTextMeta();
    if (resp.cached) textHint.textContent = 'OBS не подключён — список из кэша';
  });
}

function bindTextSrcRefresh() {
  const b = document.getElementById('textSrcRefresh');
  if (b) b.addEventListener('click', (e) => { e.stopPropagation(); loadTextSources(); });
}

function updateTextSrcCount() {
  textSrcCount.textContent = textSrcPop.querySelectorAll('input[type="checkbox"]:checked').length;
}

function updateTextMeta() {
  const n = savedTextSources.filter((s) => textSourcesCache.indexOf(s) !== -1).length;
  textSummaryMeta.textContent = textEnabledInput.checked ? (n ? n + ' ист.' : 'нет источников') : 'выкл';
}

function inferTextPreset(fmt) {
  for (const k in TEXT_PRESETS) { if (TEXT_PRESETS[k] === fmt) return k; }
  return 'custom';
}

function buildTextFormat() {
  const preset = textFormatValue;
  if (preset === 'custom') {
    return (textCustomFormat.value || '').trim() || '{artist} — {title}';
  }
  const template = TEXT_PRESETS[preset] || TEXT_PRESETS.a1;
  const sep = textSepValue;
  const sepText = sep === 'custom' ? (textCustomSep.value || ' — ') : (' ' + sep + ' ');
  return template.split(' — ').join(sepText);
}

function renderTextPreview() {
  const fmt = buildTextFormat();
  const t = lastTrack;
  let text = fmt
    .split('{artist}').join(t ? (t.artist || '') : 'Artist')
    .split('{title}').join(t ? (t.title || '') : 'Title')
    .split('{album}').join(t ? (t.album || '') : 'Album');
  text = text.trim();
  textPreview.textContent = text || '—';
}

function renderTextDropdowns() {
  textFormatOptions.innerHTML = TEXT_FORMATS.map((f) =>
    '<div class="style-option' + (f.value === textFormatValue ? ' active' : '') + '" data-value="' + f.value + '">' + f.label + '</div>'
  ).join('');
  textSepOptions.innerHTML = TEXT_SEPS.map((s) =>
    '<div class="style-option' + (s.value === textSepValue ? ' active' : '') + '" data-value="' + s.value + '">' + s.label + '</div>'
  ).join('');
  const fmt = TEXT_FORMATS.find((f) => f.value === textFormatValue) || TEXT_FORMATS[0];
  const sep = TEXT_SEPS.find((s) => s.value === textSepValue) || TEXT_SEPS[0];
  textFormatSummary.textContent = fmt.label;
  textSepSummary.textContent = sep.label;
}

function updateTextFormatUI() {
  const customFmt = textFormatValue === 'custom';
  textCustomFormatRow.hidden = !customFmt;
  textSepDD.classList.toggle('disabled', customFmt);
  const customSep = !customFmt && textSepValue === 'custom';
  textCustomSepRow.hidden = !customSep;
  renderTextPreview();
}

function saveTextConfig() {
  const sources = Array.from(textSrcPop.querySelectorAll('input[type="checkbox"][data-source]'))
    .filter((cb) => cb.checked).map((cb) => cb.getAttribute('data-source'));
  savedTextSources = sources;
  const format = buildTextFormat();
  const config = {
    enabled: textEnabledInput.checked,
    sources,
    format,
    scroll: textScrollInput.checked,
    scrollSpeed: parseInt(textScrollSpeedInput.value, 10) || 50,
    gap: Math.max(0, Math.min(50, parseInt(textGapInput.value, 10) || 0))
  };
  chrome.storage.local.set({
    textEnabled: config.enabled,
    textSources: sources,
    textFormat: format,
    textPreset: textFormatValue,
    textSep: textSepValue,
    textCustomFormat: textCustomFormat.value,
    textCustomSep: textCustomSep.value,
    textScroll: config.scroll,
    textScrollSpeed: config.scrollSpeed,
    textGap: config.gap,
    textGap: config.gap
  });
  chrome.runtime.sendMessage({ type: 'setTextConfig', ...config }, (resp) => {
    textHint.textContent = resp && resp.ok ? 'Сохранено' : 'Ошибка сохранения';
  });
  updateTextMeta();
}

function saveSettings() {
  const port = portInput.value.trim() || '4455';
  const usePassword = usePasswordInput.checked;
  const wsPassword = passwordInput.value;
  chrome.storage.local.set({ wsPort: port, wsPassword, usePassword }, () => {
    statusDot.className = 'dot connecting';
    statusText.textContent = T('statusConnecting');
    statusHint.textContent = '';
    chrome.runtime.sendMessage({ type: 'reconnect', wsPort: port, wsPassword, usePassword });
  });
}

saveBtn.addEventListener('click', saveSettings);

portInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveSettings();
});

usePasswordInput.addEventListener('change', () => {
  passwordRow.hidden = !usePasswordInput.checked;
});
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveSettings();
});
textEnabledInput.addEventListener('change', updateTextMeta);
textCustomFormat.addEventListener('input', renderTextPreview);
textCustomSep.addEventListener('input', renderTextPreview);
textFormatOptions.addEventListener('click', (e) => {
  const opt = e.target.closest('.style-option');
  if (!opt) return;
  textFormatValue = opt.getAttribute('data-value');
  textFormatDD.open = false;
  renderTextDropdowns();
  updateTextFormatUI();
});
textSepOptions.addEventListener('click', (e) => {
  const opt = e.target.closest('.style-option');
  if (!opt) return;
  textSepValue = opt.getAttribute('data-value');
  textSepDD.open = false;
  renderTextDropdowns();
  updateTextFormatUI();
});
textSaveBtn.addEventListener('click', saveTextConfig);

function buildStyleOptions() {
  styleOptions.innerHTML = STYLES.map(s =>
    `<div class="style-option${s.id === currentStyle ? ' active' : ''}" data-style="${s.id}">${T(s.key)}</div>`
  ).join('');
  const label = STYLES.find(s => s.id === currentStyle);
  styleSummary.textContent = label ? T(label.key) : currentStyle;
  applyPreviewStyle(currentStyle);
}

function updateStyleUI() {
  styleOptions.querySelectorAll('.style-option').forEach(el => {
    el.classList.toggle('active', el.dataset.style === currentStyle);
  });
  const label = STYLES.find(s => s.id === currentStyle);
  styleSummary.textContent = label ? T(label.key) : currentStyle;
  applyPreviewStyle(currentStyle);
}

loadSettings();
loadLang();
initPreviewFrame();
checkStatus();
setInterval(checkStatus, 2000);

if (diagLink) {
  diagLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const diag = await chrome.runtime.sendMessage({ type: 'collectDiag' });
      const blob = new Blob([JSON.stringify(diag, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'music-widget-diag.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {}
  });
}

if (updateBar) {
  updateBar.addEventListener('click', () => { chrome.tabs.create({ url: releaseUrl }); });
}
chrome.runtime.sendMessage({ type: 'checkUpdate' }).then((res) => {
  if (res && res.updateAvailable) {
    latestVersion = res.latestVersion || '';
    releaseUrl = res.releaseUrl || releaseUrl;
  } else {
    latestVersion = '';
  }
  renderUpdateBar();
}).catch(() => {});

chrome.storage.local.get({ widgetStyle: 'classic' }, (items) => {
  currentStyle = items.widgetStyle || 'classic';
  updateStyleUI();
  applyPreviewStyle(currentStyle);
});

styleOptions.addEventListener('click', (e) => {
  const opt = e.target.closest('.style-option');
  if (!opt) return;
  const style = opt.dataset.style;
  if (style === currentStyle) { styleDropdown.open = false; return; }
  currentStyle = style;
  chrome.storage.local.set({ widgetStyle: style });
  chrome.runtime.sendMessage({ type: 'setStyle', style });
  updateStyleUI();
  styleDropdown.open = false;
  applyPreviewStyle(currentStyle);
});
