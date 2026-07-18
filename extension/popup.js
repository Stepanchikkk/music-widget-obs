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
const trackSectionTitle = document.getElementById('trackSectionTitle');
const trackSource = document.getElementById('trackSource');
const previewWidget = document.getElementById('previewWidget');
const previewArtwork = document.getElementById('previewArtwork');
const previewArtworkBg = document.getElementById('previewArtworkBg');
const previewTitle = document.getElementById('previewTitle');
const previewArtist = document.getElementById('previewArtist');
const previewAlbum = document.getElementById('previewAlbum');
const previewPlay = document.getElementById('previewPlay');
const previewProgress = document.getElementById('previewProgress');
const previewTiming = document.getElementById('previewTiming');
const widgetPreviewBody = document.getElementById('widgetPreviewBody');
const noPreview = document.getElementById('noPreview');
const previewCanvas = document.getElementById('previewColorAnalyzer');
const saveBtn = document.getElementById('saveBtn');
const langSwitch = document.getElementById('langSwitch');
const styleDropdown = document.getElementById('styleDropdown');
const styleSummary = document.getElementById('styleSummary');
const styleOptions = document.getElementById('styleOptions');

const STYLES = [
  { id: 'classic', key: 'styleClassic' },
  { id: 'compact', key: 'styleCompact' },
];

const WIDGET_CSS = `
.widget {
    display: none;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
    animation: fadeIn 0.3s ease;
    transition: background 1s ease;
    overflow: hidden;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6), 0 0 12px rgba(0,0,0,0.4);
}
.widget.active { display: flex; }
.widget.compact .track-album { display: none; }
.widget.compact .timing { display: none; }
.widget.h.compact .track-title { font-size: calc(40vh); line-height: 1.45; }
.widget.h.compact .track-artist { font-size: calc(26vh); line-height: 1.5; margin-top: -0.2em}
.widget.v.compact .track-title { font-size: calc(28vh); line-height: 1.45; }
.widget.v.compact .track-artist { font-size: calc(20vh); line-height: 1.5; }
.widget.h.compact .state-btn { width: calc(38vh); height: calc(38vh); }
.widget.v.compact .state-btn { width: calc(30vh); height: calc(30vh); }
.widget.h {
    flex-direction: row;
    align-items: stretch;
}
.widget.h .artwork-wrap {
    width: 28%;
    min-width: 60px;
    position: relative;
    overflow: hidden;
}
.widget.h .track-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px 80px 16px 16px;
    min-width: 0;
    gap: 0;
    overflow: hidden;
}
.widget.h .controls {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 0;
}
.widget.h .timing {
    font-size: calc(8vh);
    margin: 0;
    white-space: nowrap;
}
.widget.h .state-btn {
    width: calc(35vh);
    height: calc(35vh);
}
.widget.v {
    flex-direction: column;
}
.widget.v .artwork-wrap {
    flex: none;
    height: 50%;
    max-height: 50%;
    position: relative;
    overflow: hidden;
}
.widget.v .track-info {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 16px 4px;
    gap: 2px;
}
.widget.v .controls {
    padding: 4px 16px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.widget.v .state-btn {
    width: calc(10vh);
    height: calc(10vh);
}
.progress-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 0 0 12px 12px;
    overflow: hidden;
}
.widget.h .progress-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.widget.v .progress-wrap {
    position: relative;
}
.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--accent-1, #8b5cf6), var(--accent-2, #06b6d4));
    transition: width 1s linear;
}
.progress-fill.paused { opacity: 0.35; }
.artwork {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
}
.artwork.visible { display: block; }
.artwork-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.04);
}
.artwork-bg.hidden { display: none; }
.artwork-bg svg {
    width: 40%;
    height: 40%;
    opacity: 0.15;
    fill: rgba(255,255,255,0.6);
}
.track-title-wrap,
.track-artist-wrap,
.track-album-wrap {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}
.track-title-wrap .marquee-inner,
.track-artist-wrap .marquee-inner,
.track-album-wrap .marquee-inner {
    display: inline-block;
    will-change: transform;
}
.track-title-wrap .marquee-inner.active,
.track-artist-wrap .marquee-inner.active,
.track-album-wrap .marquee-inner.active {
    animation: marquee var(--marquee-duration, 12s) linear 1 forwards;
}
.track-title-wrap .marquee-inner span,
.track-artist-wrap .marquee-inner span,
.track-album-wrap .marquee-inner span {
    display: inline-block;
    padding-right: 3em;
}
@keyframes marquee {
    0%   { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
}
.track-title {
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 0.08em;
}
.widget.h .track-title { font-size: calc(22vh); line-height: 1.45; margin-bottom: 0; }
.widget.v .track-title { font-size: calc(12vh); line-height: 1.45; }
.track-artist {
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.widget.h .track-artist { font-size: calc(14vh); line-height: 1.45; margin-bottom: 2px; }
.widget.v .track-artist { font-size: calc(7vh); line-height: 1.45; margin-bottom: 4px; }
.timing {
    color: rgba(255,255,255,0.5);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1.4;
    white-space: nowrap;
}
.widget.h .timing { font-size: calc(14vh); line-height: 1.45; margin-top: -0.2em}
.widget.v .timing { font-size: calc(3vh); line-height: 1.45; margin-top: -0.2em}
.track-album {
    color: rgba(255,255,255,0.35);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.35;
}
.widget.h .track-album { font-size: calc(14vh); margin-top: -0.2em; margin-bottom: 2px;}
.widget.v .track-album { font-size: calc(4vh); margin-top: -0.2em; margin-bottom: 2px;}
.state-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.8);
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    transition: background 0.2s;
    flex-shrink: 0;
}
.state-btn:hover {
    background: rgba(255,255,255,0.15);
}
.state-btn svg {
    width: 45%;
    height: 45%;
}
#colorAnalyzer { display: none; }
`;

function injectPreviewStyles() {
  const el = document.getElementById('pw-styles');
  if (el) return;
  const INTERNAL_H = 60;
  let css = WIDGET_CSS
    .replace(/calc\((\d+)vh\)/g, (_, n) => (n * INTERNAL_H / 100).toFixed(1) + 'px')
    .replace(/min\(calc\(\d+vh\), calc\(\d+vw\)\)/g, (_, n) => (n * INTERNAL_H / 100).toFixed(1) + 'px')
    .replace(/\.widget\b/g, '.preview-wrap > .widget-preview');
  const style = document.createElement('style');
  style.id = 'pw-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

function T(key, vars) {
  let s = (L10N[lang] && L10N[lang][key]) || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, v);
    }
  }
  return s;
}

function fmtTime(s) {
  if (!s || s <= 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function previewColors(img) {
  const c = previewCanvas.getContext('2d');
  previewCanvas.width = 8; previewCanvas.height = 8;
  c.drawImage(img, 0, 0, 8, 8);
  const d = c.getImageData(0, 0, 8, 8).data;
  const p = [];
  for (let i = 0; i < d.length; i += 4) p.push([d[i], d[i+1], d[i+2]]);
  p.sort((a,b) => (a[0]+a[1]+a[2]) - (b[0]+b[1]+b[2]));
  return { dark: p[Math.floor(p.length*0.1)], light: p[Math.floor(p.length*0.7)] };
}

function previewApplyColors(d, l) {
  const da = (d[0]+d[1]+d[2])/3;
  if (da > 90) d = d.map(v => Math.max(v*0.25, 8)|0);
  widgetPreviewBody.style.background = `linear-gradient(135deg, rgba(${d[0]},${d[1]},${d[2]},0.96), rgba(${Math.min(d[0]+55,255)},${Math.min(d[1]+55,255)},${Math.min(d[2]+55,255)},0.92))`;
  const b = (l[0]*299+l[1]*587+l[2]*114)/1000;
  const a = b < 80 ? l.map(v => Math.min(v+120,255)) : l;
  widgetPreviewBody.style.setProperty('--accent-1', `rgb(${a[0]},${a[1]},${a[2]})`);
  widgetPreviewBody.style.setProperty('--accent-2', `rgb(${Math.min(a[0]+40,255)},${Math.min(a[1]+40,255)},${Math.min(a[2]+40,255)})`);
}

function previewResetColors() {
  widgetPreviewBody.style.background = '';
  widgetPreviewBody.style.removeProperty('--accent-1');
  widgetPreviewBody.style.removeProperty('--accent-2');
}

const SVG_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 20,12 7,20"/></svg>';
const SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

function setPreviewMarquee(el, text) {
  el.classList.remove('active');
  if (!text) { el.innerHTML = '<span></span>'; return; }
  el.innerHTML = '<span>' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span>';
  const wrap = el.closest('.track-title-wrap, .track-artist-wrap, .track-album-wrap');
  if (!wrap) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const cw = wrap.clientWidth;
      const span = el.querySelector('span');
      if (!span) return;
      const tw = span.getBoundingClientRect().width;
      el.classList.remove('active');
      if (tw > cw + 2) {
        el.innerHTML = '<span>' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span><span>' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span>';
        const dur = Math.max(4, (tw / 80) * 1000);
        el.style.setProperty('--marquee-duration', (dur / 1000) + 's');
        el.classList.add('active');
      }
    });
  });
}

function updatePreview(track) {
  if (!track) {
    noPreview.classList.add('active');
    noPreview.textContent = '—';
    widgetPreviewBody.classList.add('hidden');
    widgetPreviewBody.classList.remove('active');
    previewResetColors();
    return;
  }
  noPreview.classList.remove('active');
  widgetPreviewBody.classList.remove('hidden');
  widgetPreviewBody.classList.add('active', 'h');

  setPreviewMarquee(previewTitle, track.title || '');
  setPreviewMarquee(previewArtist, track.artist || '');
  setPreviewMarquee(previewAlbum, track.album || '');

  const isPaused = track.state === 'paused';
  previewPlay.innerHTML = isPaused ? SVG_PLAY : SVG_PAUSE;
  previewProgress.className = 'progress-fill' + (isPaused ? ' paused' : '');

  if (track.duration > 0) {
    const adj = (track.currentTime||0) + (Date.now() - (track.ts||Date.now())) / 1000;
    previewTiming.textContent = fmtTime(adj) + ' / ' + fmtTime(track.duration);
    previewProgress.style.width = Math.min(adj / track.duration * 100, 100) + '%';
  } else {
    previewTiming.textContent = '';
    previewProgress.style.width = '0%';
  }

  if (track.thumbnail) {
    previewArtwork.src = track.thumbnail;
    previewArtwork.onload = () => {
      previewArtwork.classList.add('visible');
      previewArtworkBg.classList.add('hidden');
      try { const c = previewColors(previewArtwork); previewApplyColors(c.dark, c.light); } catch(e) {}
    };
    previewArtwork.onerror = () => {
      previewArtwork.classList.remove('visible');
      previewArtworkBg.classList.remove('hidden');
      previewResetColors();
    };
  } else {
    previewArtwork.classList.remove('visible');
    previewArtworkBg.classList.remove('hidden');
    previewResetColors();
  }

  applyPreviewStyle(currentStyle);
}
function applyPreviewStyle(style) {
  widgetPreviewBody.classList.toggle('compact', style === 'compact');
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
  buildStyleOptions();
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
    updateStyleUI();
  }
  if (status.connected) {
    statusDot.className = 'dot connected';
    trackSection.style.display = 'block';
    if (status.track) {
      statusText.innerHTML = T('statusConnected');
      trackSource.textContent = status.source || '';
      updatePreview(status.track);
    } else {
      statusText.innerHTML = T('statusConnected');
      trackSource.textContent = '—';
      updatePreview(null);
    }
    statusHint.textContent = '';
  } else {
    statusDot.className = 'dot disconnected';
    statusText.innerHTML = T('statusDisconnected');
    trackSection.style.display = 'block';
    trackSource.textContent = '';
    updatePreview(null);

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
checkStatus();
setInterval(checkStatus, 2000);
injectPreviewStyles();

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
