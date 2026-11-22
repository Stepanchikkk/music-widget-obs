let lang = 'ru';

const L10N = {
  ru: {
    title: 'Music Widget OBS',
    step1: '<strong>\u0421\u0435\u0440\u0432\u0438\u0441</strong> \u2192 <strong>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 WebSocket</strong>',
    step2: 'Поставьте галочку <strong>Включить сервер WebSocket</strong>, порт <code>4455</code>. Если включён пароль — введите его в параметрах WebSocket.',
    step3: '<strong>Добавить источник</strong> → <strong>Браузер</strong> → <strong>Создать новый</strong> → в поле <strong>URL</strong> вставьте:',
    footer: '\u0420\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u043d\u0430 GitHub',
    copyWidget: 'Скопировать',
    copied: 'Скопировано',
    downloadWidget: 'Скачайте widget.html',
    sectionTitle1: '\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a OBS',
    sectionTitle2: '\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0433\u0440\u0430\u0435\u0442',
    sectionTitle3: '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b WebSocket',
    stepsTitle: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 OBS',
    portLabel: '\u041f\u043e\u0440\u0442',
    passLabel: 'Пароль',
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
   styleHelp: 'Чтобы закрепить стиль за конкретной сценой, скопируйте ссылку нужного стиля и вставьте её в адрес источника в OBS. Такой источник перестанет переключаться из расширения.',
    styleHelpHint: 'Ссылка без стиля вернёт управление расширению.',
    textHelp: 'Расширение записывает строку с треком в выбранный текстовый источник OBS. Шрифт, цвет, обводку и размер настраивайте в самом OBS — расширение меняет только текст.',
    textHelpHint: 'Если у источника включено «Читать из файла», OBS игнорирует текст из расширения — галочку нужно снять. «Прокрутка» добавляет фильтр «MW Scroll».',
   copyStyleTitle: 'Скопировать ссылку с этим стилем, если нужно закрепить его за сценой',
   copyCurrentTitle: 'Скопировать ссылку с текущим стилем, если нужно закрепить его за сценой',
   copyBaseTitle: 'Ссылка без стиля — вернуть управление расширению',
    baseLinkRow: 'Ссылка без стиля',
    copyBaseBtn: 'Скопировать базовую ссылку',
    toastStyle: 'Ссылка скопирована. Источник с этой ссылкой больше не будет переключаться из расширения.',
    toastBase: 'Базовая ссылка скопирована. Замените адрес в источнике, чтобы вернуть управление расширению.',
    helpBtn: 'Справка',
    diagLink: 'Диагностика',
    styleClassic: '\u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0438\u0439',
    styleCompact: '\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439',
    styleGlass: '\u0421\u0442\u0435\u043a\u043b\u044f\u043d\u043d\u044b\u0439',
    styleGlassCompact: 'Компактный стеклянный',
    styleMinimal: '\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u044b\u0439',
    styleStereo: '\u041c\u0430\u0433\u043d\u0438\u0442\u043e\u043b\u0430',
    styleFallout: 'Fallout',
    styleVinyl: 'Винил',
    styleVinylTip: 'Рекомендуемые размеры: горизонтально 600×200, вертикально 500×500',
    styleCover: 'Обложка',
    styleCoverTip: 'Рекомендуемые размеры: горизонтально 600×200, вертикально 500×500',
    styleBlur: 'Размытие',
    styleBlurTip: 'Рекомендуемый размер: горизонтально 600×200, квадрат 500×500',
    stylePlayer: 'Плеер',
    stylePlayerTip: 'Рекомендуемый размер: горизонтально 600×200, вертикально 360×480',
    styleKaraoke: 'Заголовок',
    styleKaraokeTip: 'Рекомендуемый размер: горизонтально 700×200, квадрат 420×420',
  },
  en: {
    title: 'Music Widget OBS',
    step1: '<strong>Services</strong> \u2192 <strong>WebSocket Server Settings</strong>',
    step2: 'Check <strong>Enable WebSocket server</strong>, port <code>4455</code>. If a password is enabled, enter it in the WebSocket settings below.',
    step3: '<strong>Add Source</strong> → <strong>Browser</strong> → <strong>Create New</strong> → paste into the <strong>URL</strong> field:',
    footer: 'Project repository on GitHub',
    copyWidget: 'Copy',
    copied: 'Copied',
    downloadWidget: 'Скачайте widget.html',
    sectionTitle1: 'OBS Connection',
    sectionTitle2: 'Now Playing',
    sectionTitle3: 'WebSocket Settings',
    stepsTitle: 'OBS Setup',
    portLabel: 'Port',
    passLabel: 'Password',
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
   styleHelp: 'To pin a style to a single scene, copy the link of the style you need and paste it into the OBS source URL. That source will stop following the extension.',
    styleHelpHint: 'The link without a style returns control to the extension.',
    textHelp: 'The extension writes the track line into the selected OBS text source. Font, color, outline and size are configured in OBS itself — the extension only changes the text.',
    textHelpHint: 'If "Read from file" is enabled on the source, OBS ignores the text from the extension — turn it off. "Scrolling" adds the "MW Scroll" filter.',
   copyStyleTitle: 'Copy the link with this style if you need to pin it to a scene',
   copyCurrentTitle: 'Copy the link with the current style if you need to pin it to a scene',
   copyBaseTitle: 'Link without a style — return control to the extension',
    baseLinkRow: 'Link without a style',
    copyBaseBtn: 'Copy the base link',
    toastStyle: 'Link copied. A source with this link will no longer switch styles from the extension.',
    toastBase: 'Base link copied. Replace the source URL to return control to the extension.',
    helpBtn: 'Help',
    diagLink: 'Diagnostics',
    styleClassic: 'Classic',
    styleCompact: 'Compact',
    styleGlass: 'Glass',
    styleGlassCompact: 'Compact Glass',
    styleMinimal: 'Minimal',
    styleStereo: 'Car Stereo',
    styleFallout: 'Fallout',
    styleVinyl: 'Vinyl',
    styleVinylTip: 'Recommended sizes: horizontal 600×200, vertical 500×500',
    styleCover: 'Cover',
    styleCoverTip: 'Recommended sizes: horizontal 600×200, vertical 500×500',
    styleBlur: 'Blur',
    styleBlurTip: 'Recommended size: 600×200 horizontal, 500×500 square',
    stylePlayer: 'Player',
    stylePlayerTip: 'Recommended size: 600×200 horizontal, 360×480 square',
    styleKaraoke: 'Headline',
    styleKaraokeTip: 'Recommended size: 700×200 horizontal, 420×420 square',
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
const textHint = document.getElementById('textHint');
const textSummaryMeta = document.getElementById('textSummaryMeta');
const textSettings = document.getElementById('textSettings');
const textScrollSettings = document.getElementById('textScrollSettings');
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
const WIDGET_URL = 'https://stepanchikkk.github.io/music-widget-obs/widget.html';
const styleDropdown = document.getElementById('styleDropdown');
const styleSummary = document.getElementById('styleSummary');
const styleOptions = document.getElementById('styleOptions');
const diagLink = document.getElementById('diagLink');

const STYLES = [
  { id: 'classic', key: 'styleClassic' },
  { id: 'compact', key: 'styleCompact' },
  { id: 'glass', key: 'styleGlass' },
  { id: 'glass-compact', key: 'styleGlassCompact' },
  { id: 'minimal', key: 'styleMinimal' },
  { id: 'stereo', key: 'styleStereo' },
  { id: 'fallout', key: 'styleFallout' },
  { id: 'vinyl', key: 'styleVinyl', tip: 'styleVinylTip', tipDelay: 350 },
  { id: 'cover', key: 'styleCover', tip: 'styleCoverTip', tipDelay: 350 },
  { id: 'blur', key: 'styleBlur', tip: 'styleBlurTip', tipDelay: 350 },
  { id: 'player', key: 'stylePlayer', tip: 'stylePlayerTip', tipDelay: 350 },
  { id: 'karaoke', key: 'styleKaraoke', tip: 'styleKaraokeTip', tipDelay: 350 },
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


let lastTrack = null;
let lastConnected = false;
let currentStyle = 'classic';

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
  const urlCode = document.getElementById('widgetUrlCode');
  if (urlCode) urlCode.value = WIDGET_URL;
  const dl = document.getElementById('downloadWidget');
  if (dl) dl.textContent = T('downloadWidget');
  document.querySelector('.field-row label').textContent = T('portLabel');
  const pwLabelEl = document.querySelector('.ws-pw-label');
  if (pwLabelEl) pwLabelEl.textContent = T('passLabel');
  saveBtn.textContent = T('saveBtn');
  langSwitch.textContent = lang === 'ru' ? 'EN' : 'RU';
  document.getElementById('styleSectionTitle').textContent = T('styleTitle');
  const styleHelpTextEl = document.getElementById('styleHelpText');
  if (styleHelpTextEl) styleHelpTextEl.textContent = T('styleHelp');
  const styleHelpHintEl = document.getElementById('styleHelpHint');
  if (styleHelpHintEl) styleHelpHintEl.textContent = T('styleHelpHint');
  const textHelpTextEl = document.getElementById('textHelpText');
  if (textHelpTextEl) textHelpTextEl.textContent = T('textHelp');
  const textHelpHintEl = document.getElementById('textHelpHint');
  if (textHelpHintEl) textHelpHintEl.textContent = T('textHelpHint');
  const textHelpBtnEl = document.getElementById('textHelpBtn');
  if (textHelpBtnEl) textHelpBtnEl.setAttribute('aria-label', T('helpBtn'));
  if (copyBaseBtn) copyBaseBtn.textContent = T('copyBaseBtn');
  if (styleHelpBtn) styleHelpBtn.setAttribute('aria-label', T('helpBtn'));
  if (copyStyleLinkBtn) { copyStyleLinkBtn.setAttribute('data-tip', T('copyCurrentTitle')); copyStyleLinkBtn.setAttribute('aria-label', T('copyCurrentTitle')); }
  buildStyleOptions();
}

const copyWidgetBtn = document.getElementById('copyWidgetUrl');
if (copyWidgetBtn) {
  copyWidgetBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(WIDGET_URL);
      copyWidgetBtn.setAttribute('data-tip', T('copied'));
      copyWidgetBtn.setAttribute('aria-label', T('copied'));
      setTimeout(() => { copyWidgetBtn.setAttribute('data-tip', T('copyWidget')); copyWidgetBtn.setAttribute('aria-label', T('copyWidget')); }, 1500);
    } catch (e) {}
  });
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
  const wizardBtn = document.getElementById('startWizard');
  if (wizardBtn) {
    const ok = !!(status && status.connected);
    wizardBtn.classList.toggle('btn-primary', !ok);
    wizardBtn.classList.toggle('btn-quiet', ok);
    wizardBtn.textContent = 'Мастер настройки';
    const head = document.querySelector('.section-head');
    const host = ok && head ? head : document.querySelector('#statusHint');
    if (host && wizardBtn.parentElement !== host) {
      if (ok && head) head.appendChild(wizardBtn);
      else if (host) host.after(wizardBtn);
    }
  }
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
  if (textSettings) textSettings.hidden = !items.textEnabled;
  if (textScrollSettings) textScrollSettings.hidden = !items.textScroll;
    savedTextSources = Array.isArray(items.textSources) ? items.textSources : [];
    updateTextFormatUI();
    updateTextMeta();
    loadTextSources();
  });
}

function loadTextSources() {
  if (!textSrcPop) return;
  textSrcPop.innerHTML = '<div class="src-item src-empty">Нет источников OBS</div>';
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
      cb.addEventListener('change', () => { updateTextSrcCount(); saveTextConfig(); });
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

textEnabledInput.addEventListener('change', () => {
  if (textSettings) textSettings.hidden = !textEnabledInput.checked;
  saveTextConfig();
});
textScrollInput.addEventListener('change', () => {
  if (textScrollSettings) textScrollSettings.hidden = !textScrollInput.checked;
  saveTextConfig();
});
if (textScrollSpeedInput) textScrollSpeedInput.addEventListener('input', saveTextConfig);
if (textGapInput) textGapInput.addEventListener('input', saveTextConfig);

function updateTextMeta() {
  if (!textSummaryMeta) return;
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
    if (textHint) textHint.textContent = resp && resp.ok ? 'Сохранено' : 'Ошибка сохранения';
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

const tipEl = document.getElementById('tip');
let tipTarget = null;

function positionTip() {
  if (!tipTarget || !tipEl) return;
  const r = tipTarget.getBoundingClientRect();
  const tw = tipEl.offsetWidth;
  const th = tipEl.offsetHeight;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  let left = r.left + r.width / 2 - tw / 2;
  left = Math.max(8, Math.min(left, vw - tw - 8));
  let top = r.top - th - 6;
  if (top < 8) top = r.bottom + 6;
  if (top + th > vh - 8) top = Math.max(8, r.top - th - 6);
  if (top + th > vh - 8) top = Math.max(8, vh - th - 8);
  tipEl.style.left = left + 'px';
  tipEl.style.top = top + 'px';
}

function showTip(target) {
  const text = target.getAttribute('data-tip');
  if (!text || !tipEl) return;
  tipTarget = target;
  tipEl.textContent = text;
  tipEl.hidden = false;
  positionTip();
  tipEl.classList.add('show');
}

function hideTip() {
  if (!tipEl) return;
  tipEl.classList.remove('show');
  tipEl.hidden = true;
  tipTarget = null;
}

let tipDelayTimer = null;

function scheduleTip(target) {
  clearTimeout(tipDelayTimer);
  const delay = parseInt(target.getAttribute('data-tip-delay') || '0', 10) || 0;
  if (!delay) { showTip(target); return; }
  tipDelayTimer = setTimeout(() => showTip(target), delay);
}

document.addEventListener('mouseover', (e) => {
  const t = e.target.closest('[data-tip]');
  if (t && t !== tipTarget) scheduleTip(t);
});
document.addEventListener('mouseout', (e) => {
  clearTimeout(tipDelayTimer);
  const t = e.target.closest('[data-tip]');
  if (t && t === tipTarget && !t.contains(e.relatedTarget)) hideTip();
});
document.addEventListener('focusin', (e) => {
  const t = e.target.closest('[data-tip]');
  if (t) showTip(t);
});
document.addEventListener('focusout', hideTip);
window.addEventListener('scroll', positionTip, true);
window.addEventListener('resize', positionTip);

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '-1000px';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  ta.remove();
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

let toastTimer = null;
function showToast(text) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

function copyStyleLink(styleId) {
  copyToClipboard(WIDGET_URL + '?style=' + encodeURIComponent(styleId))
    .then(() => showToast(T('toastStyle')))
    .catch(() => {});
}

function copyBaseLink() {
  copyToClipboard(WIDGET_URL)
    .then(() => showToast(T('toastBase')))
    .catch(() => {});
}

const copyStyleLinkBtn = document.getElementById('copyStyleLink');
if (copyStyleLinkBtn) copyStyleLinkBtn.addEventListener('click', () => copyStyleLink(currentStyle));

const copyBaseBtn = document.getElementById('copyBaseLink');
if (copyBaseBtn) copyBaseBtn.addEventListener('click', () => copyBaseLink());

function bindHelp(btnId, boxId) {
  const btn = document.getElementById(btnId);
  const box = document.getElementById(boxId);
  if (!btn || !box) return;
  let pinned = false;
  let timer = null;
  const show = () => {
    clearTimeout(timer);
    box.classList.remove('help-pop-up');
    box.hidden = false;
    const r = box.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 8) box.classList.add('help-pop-up');
  };
  const hide = () => { if (!pinned) box.hidden = true; };
  const scheduleHide = () => { clearTimeout(timer); timer = setTimeout(hide, 160); };
  btn.addEventListener('mouseenter', show);
  btn.addEventListener('mouseleave', scheduleHide);
  box.addEventListener('mouseenter', show);
  box.addEventListener('mouseleave', scheduleHide);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    pinned = !pinned;
    box.hidden = !pinned;
  });
  document.addEventListener('click', (e) => {
    if (!pinned) return;
    if (box.contains(e.target) || btn.contains(e.target)) return;
    pinned = false;
    box.hidden = true;
  });
}

bindHelp('styleHelpBtn', 'styleHelp');
bindHelp('textHelpBtn', 'textHelp');

function buildStyleOptions() {
  styleOptions.innerHTML = STYLES.map(s =>
    '<div class="style-option' + (s.id === currentStyle ? ' active' : '') + '" data-style="' + s.id + '"' +
      (s.tip ? ' data-tip="' + T(s.tip) + '" data-tip-delay="' + (s.tipDelay || 0) + '"' : '') + '>' +
      '<span>' + T(s.key) + '</span>' +
      '<button class="style-copy" type="button" data-copy-style="' + s.id + '" data-tip="' + T('copyStyleTitle') + '" aria-label="' + T('copyStyleTitle') + '">&#10697;</button>' +
    '</div>'
  ).join('') +
  '<div class="style-option style-option-base" data-copy-base="1">' +
    '<span>' + T('baseLinkRow') + '</span>' +
    '<button class="style-copy" type="button" data-copy-base="1" data-tip="' + T('copyBaseTitle') + '" aria-label="' + T('copyBaseTitle') + '">&#10697;</button>' +
  '</div>';
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


chrome.storage.local.get({ widgetStyle: 'classic' }, (items) => {
  currentStyle = items.widgetStyle || 'classic';
  updateStyleUI();
  applyPreviewStyle(currentStyle);
});

styleOptions.addEventListener('click', (e) => {
  const copyRow = e.target.closest('[data-copy-style]');
  if (copyRow) {
    e.stopPropagation();
    copyStyleLink(copyRow.getAttribute('data-copy-style'));
    styleDropdown.open = false;
    return;
  }
  if (e.target.closest('[data-copy-base]')) {
    e.stopPropagation();
    copyBaseLink();
    styleDropdown.open = false;
    return;
  }
  const opt = e.target.closest('.style-option');
  if (!opt || !opt.dataset.style) return;
  const style = opt.dataset.style;
  if (style === currentStyle) { styleDropdown.open = false; return; }
  currentStyle = style;
  chrome.storage.local.set({ widgetStyle: style });
  chrome.runtime.sendMessage({ type: 'setStyle', style });
  updateStyleUI();
  styleDropdown.open = false;
  applyPreviewStyle(currentStyle);
});


/* setup wizard */
const wizard = document.getElementById('wizard');
const wizardTitle = document.getElementById('wizardTitle');
const wizardBody = document.getElementById('wizardBody');
const wizardAction = document.getElementById('wizardAction');
const wizardClose = document.getElementById('wizardClose');
let wizardStep = 0;
const WURL = 'https://stepanchikkk.github.io/music-widget-obs/widget.html';

function clearWizardHighlight() {
  document.querySelectorAll('.wizard-target').forEach((el) => el.classList.remove('wizard-target'));
}
function highlightTarget(sel) {
  clearWizardHighlight();
  const node = document.querySelector(sel);
  const el = node ? (node.closest('.section') || node) : null;
  if (el) { el.classList.add('wizard-target'); el.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
}
function renderWizard() {
  if (!wizard) return;
  wizardAction.hidden = false;
  wizard.classList.toggle('wizard-top', wizardStep === 2 || wizardStep === 3);
  if (wizardStep === 0) {
    wizardTitle.textContent = 'Шаг 1 из 5 · WebSocket';
    wizardBody.innerHTML = 'В OBS: <b>Сервис → Настройки сервера WebSocket</b> → включить, порт <code>4455</code>.<br><br>Если включён пароль — либо <b>отключите</b> его в OBS, либо включите тумблер <b>«Пароль»</b> ниже и вставьте пароль в поле. Потом «Проверить».';
    wizardAction.textContent = 'Проверить';
    highlightTarget('#wsSection');
  } else if (wizardStep === 1) {
    wizardTitle.textContent = 'Шаг 2 из 5 · Что выводим';
    wizardBody.innerHTML = 'Выберите вариант:<br><br><button class="btn" data-wizard="widget">Виджет</button> <button class="btn" data-wizard="text">Текст</button>';
    wizardAction.hidden = true;
    clearWizardHighlight();
  } else if (wizardStep === 2) {
    wizardTitle.textContent = 'Шаг 3 из 5 · Виджет';
    wizardBody.innerHTML = 'Скопируйте ссылку ниже — она понадобится в следующем шаге.';
    wizardAction.textContent = 'Далее';
    highlightTarget('.widget-link');
  } else if (wizardStep === 3) {
    wizardTitle.textContent = 'Шаг 4 из 5 · Источник';
    wizardBody.innerHTML = 'В OBS: <b>Источники → + → Браузер</b>. Задайте размер, например <b>800×200</b> (горизонтально) или любой другой, и вставьте ссылку в поле URL.';
    wizardAction.textContent = 'Далее';
    highlightTarget('#obsSteps .step:last-child');
  } else if (wizardStep === 4) {
    wizardTitle.textContent = 'Шаг 5 из 5 · Стиль';
    wizardBody.innerHTML = 'Выберите стиль виджета в попапе.';
    wizardAction.textContent = 'Готово';
    highlightTarget('#styleDropdown');
  } else if (wizardStep === 10) {
    wizardTitle.textContent = 'Шаг 3 из 4 · Текст';
    wizardBody.innerHTML = 'Включите <b>«Вывод в текстовый источник»</b> и выберите Text-источник.';
    wizardAction.hidden = true;
    highlightTarget('#textEnabled');
  } else if (wizardStep === 11) {
    wizardTitle.textContent = 'Шаг 4 из 4 · Источник';
    wizardBody.innerHTML = 'В OBS создайте <b>Text (GDI+)</b> и выберите его в списке источников ниже.';
    wizardAction.hidden = true;
    highlightTarget('#textSrcDD');
  }
}
function openWizard() { if (!wizard) return; wizard.hidden = false; wizardStep = 0; renderWizard(); }
function closeWizard() { if (wizard) wizard.hidden = true; clearWizardHighlight(); }
const startWizardBtn = document.getElementById('startWizard');
if (startWizardBtn) startWizardBtn.addEventListener('click', openWizard);
if (wizardClose) wizardClose.addEventListener('click', closeWizard);
if (wizard) {
  wizard.addEventListener('click', (e) => {
    const choice = e.target.closest('[data-wizard]');
    if (choice) { wizardStep = choice.getAttribute('data-wizard') === 'widget' ? 2 : 10; renderWizard(); }
  });
}
if (wizardAction) {
  wizardAction.addEventListener('click', async () => {
    if (wizardStep === 0) {
      try {
        const res = await chrome.runtime.sendMessage({ type: 'getStatus' });
        if (res && res.connected) { wizardStep = 1; renderWizard(); }
        else { wizardBody.innerHTML += '<br><br><b class="wizard-error">OBS не отвечает.</b> Проверьте, что сервер WebSocket включён и порт 4455.'; }
      } catch (e) { wizardBody.innerHTML += '<br><br><b class="wizard-error">OBS не отвечает.</b>'; }
    } else if (wizardStep === 2) {
      wizardStep = 3; renderWizard();
    } else if (wizardStep === 3) {
      wizardStep = 4; renderWizard();
    } else if (wizardStep === 4) {
      closeWizard();
    } else if (wizardStep === 10) {
      const cb = document.getElementById('textEnabled');
      if (cb) { cb.checked = true; cb.dispatchEvent(new Event('change')); }
      closeWizard();
    } else { closeWizard(); }
  });
}

/* wizard waits for user actions */
if (typeof styleOptions !== 'undefined' && styleOptions) {
  styleOptions.addEventListener('click', () => { if (wizard && !wizard.hidden && wizardStep === 11) closeWizard(); });
}
if (typeof textEnabledInput !== 'undefined' && textEnabledInput) {
  textEnabledInput.addEventListener('change', () => { if (wizard && !wizard.hidden && wizardStep === 10 && textEnabledInput.checked) { wizardStep = 11; renderWizard(); } });
}
if (typeof textSrcPop !== 'undefined' && textSrcPop) {
  textSrcPop.addEventListener('click', () => { if (wizard && !wizard.hidden && wizardStep === 11) closeWizard(); });
}

/* close dropdowns on outside click */
document.addEventListener('click', (e) => {
  document.querySelectorAll('details.style-dd[open]').forEach((d) => {
    if (!d.contains(e.target)) d.open = false;
  });
});
