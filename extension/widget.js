var __STYLES = window.__STYLES || {};

var WS_PORT = new URLSearchParams(location.search).get('port') || '4455';
var LANG = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru';
var TXT = {
    ru: { noMusic: 'Нет воспроизведения', waiting: 'Ожидание подключения...' },
    en: { noMusic: 'No music playing', waiting: 'Waiting for connection...' }
};

var SVG_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 20,12 7,20"/></svg>';
var SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

var widget = document.getElementById('widget');
var colorCanvas = document.getElementById('colorAnalyzer');

var currentStyle = '';
var lockedStyle = '';
var lastTrackData = null;
var watchDog = null;
var wsWidget = null;
var wsWidgetConnected = false;
var showTrackKey = '';
var syncId = null;
var marqueeItems = [];
var marqueeGen = 0;
var marqueeTimer = null;
var placeholderEl = null, phStyle = null;

function showPlaceholder(text) {
    if (!phStyle) {
        phStyle = document.createElement('style');
        phStyle.id = 'placeholder-style';
        phStyle.textContent = '#placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:5%;z-index:1;overflow-wrap:break-word;word-break:break-all;text-align:center;font-family:"Segoe UI",Arial,sans-serif;color:rgba(255,255,255,0.4)}.h #placeholder{font-size:calc(7vw)}.v #placeholder{font-size:calc(4vh)}';
        document.head.appendChild(phStyle);
    }
    if (!placeholderEl) {
        placeholderEl = document.createElement('div');
        placeholderEl.id = 'placeholder';
        widget.appendChild(placeholderEl);
    }
    widget.style.background = '#000';
    widget.classList.add('active');
    placeholderEl.textContent = text;
}

function removePlaceholder() {
    if (placeholderEl) { placeholderEl.remove(); placeholderEl = null; }
    if (phStyle) { phStyle.remove(); phStyle = null; }
    widget.style.background = '';
}

function orient() {
    var h = window.innerHeight, w = window.innerWidth;
    widget.classList.remove('h', 'v');
    widget.classList.add(h >= w ? 'v' : 'h');
}

function fmt(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s/60) + ':' + (s%60).toString().padStart(2,'0');
}

function colors(img) {
    var c = colorCanvas.getContext('2d', { willReadFrequently: true });
    colorCanvas.width = 8; colorCanvas.height = 8;
    c.drawImage(img, 0, 0, 8, 8);
    var d = c.getImageData(0, 0, 8, 8).data;
    var p = [];
    for (var i = 0; i < d.length; i += 4) p.push([d[i], d[i+1], d[i+2]]);
    p.sort(function(a,b){return (a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]);});
    return { dark: p[Math.floor(p.length*0.1)], light: p[Math.floor(p.length*0.7)] };
}

function applyColors(d, l, forStyle) {
    if (forStyle === 'glass' || forStyle === 'minimal') return;
    var da = (d[0]+d[1]+d[2])/3;
    if (da > 90) d = [Math.max(d[0]*0.25,8)|0, Math.max(d[1]*0.25,8)|0, Math.max(d[2]*0.25,8)|0];
    widget.style.background = 'linear-gradient(135deg, rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',0.96), rgba(' + Math.min(d[0]+55,255) + ',' + Math.min(d[1]+55,255) + ',' + Math.min(d[2]+55,255) + ',0.92))';
    var b = (l[0]*299+l[1]*587+l[2]*114)/1000;
    var a = b < 80 ? [Math.min(l[0]+120,255), Math.min(l[1]+120,255), Math.min(l[2]+120,255)] : l;
    widget.style.setProperty('--accent-1', 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
    widget.style.setProperty('--accent-2', 'rgb(' + Math.min(a[0]+40,255) + ',' + Math.min(a[1]+40,255) + ',' + Math.min(a[2]+40,255) + ')');
}

function resetColors(forStyle) {
    if (forStyle === 'glass' || forStyle === 'minimal' || forStyle === 'stereo') {
        widget.style.background = '';
        widget.style.removeProperty('--accent-1');
        widget.style.removeProperty('--accent-2');
        widget.style.removeProperty('--glass-artwork');
        return;
    }
    widget.style.background = 'linear-gradient(135deg, rgba(12,12,20,0.97), rgba(28,18,48,0.93))';
    widget.style.setProperty('--accent-1', '#8b5cf6');
    widget.style.setProperty('--accent-2', '#06b6d4');
}

function tick(adj, dur, timingEl, progressEl) {
    if (syncId) clearInterval(syncId);
    var bt = adj, ts = Date.now();
    syncId = setInterval(function() {
        var cur = bt + (Date.now() - ts) / 1000;
        if (cur >= dur) { bt = 0; ts = Date.now(); }
        timingEl.textContent = fmt(cur) + ' / ' + fmt(dur);
        progressEl.style.width = Math.min(cur/dur*100, 100) + '%';
    }, 1000);
}

function sleep(ms) { return new Promise(function(r){setTimeout(r,ms);}); }

function setMarqueeText(el, text, gen) {
    if (gen !== marqueeGen) return;
    if (!text) { el.classList.remove('active'); el.innerHTML = ''; return; }
    el.classList.remove('active');
    el.innerHTML = '<span>' + text + '</span>';
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            if (gen !== marqueeGen) return;
            var wrap = el.closest('.track-title-wrap, .track-artist-wrap, .track-album-wrap');
            if (!wrap) return;
            var cw = wrap.clientWidth;
            var span = el.querySelector('span');
            var tw = span.getBoundingClientRect().width;
            var pr = parseFloat(getComputedStyle(span).paddingRight) || 0;
            if (tw - pr > cw + 2) {
                el.innerHTML = '<span>' + text + '</span><span>' + text + '</span>';
                var dur = Math.max(4000, (tw / 90) * 1000);
                el.style.setProperty('--marquee-duration', (dur / 1000) + 's');
                var found = false;
                for (var i = 0; i < marqueeItems.length; i++) {
                    if (marqueeItems[i].el === el) { marqueeItems[i].text = text; marqueeItems[i].dur = dur; found = true; break; }
                }
                if (!found) marqueeItems.push({ el: el, text: text, dur: dur });
            } else {
                el.innerHTML = '<span>' + text + '</span>';
                for (var i = 0; i < marqueeItems.length; i++) {
                    if (marqueeItems[i].el === el) { marqueeItems.splice(i, 1); break; }
                }
            }
        });
    });
}

async function marqueeCycle(gen) {
    if (gen !== marqueeGen) return;
    await sleep(3500);
    if (gen !== marqueeGen) return;
    while (marqueeItems.length > 0) {
        if (gen !== marqueeGen) return;
        for (var i = 0; i < marqueeItems.length; i++) {
            if (gen !== marqueeGen) return;
            await sleep(2500);
            if (gen !== marqueeGen) return;
            marqueeItems[i].el.classList.add('active');
            await sleep(marqueeItems[i].dur + 500);
            if (gen !== marqueeGen) return;
            marqueeItems[i].el.classList.remove('active');
            await sleep(1500);
        }
        if (gen !== marqueeGen) return;
        await sleep(5000);
    }
}

function cleanupMq() {
    for (var i = 0; i < marqueeItems.length; i++) marqueeItems[i].el.classList.remove('active');
    marqueeItems = [];
    clearTimeout(marqueeTimer);
    marqueeTimer = null;
}

function resetWatchdog() {
    if (watchDog) clearTimeout(watchDog);
    watchDog = setTimeout(function() { showStatus(TXT[LANG].noMusic); }, 3000);
}

function applyStyle(name) {
    if (syncId) clearInterval(syncId);
    syncId = null;
    marqueeGen++;
    cleanupMq();
    clearTimeout(marqueeTimer);
    marqueeTimer = null;
    showTrackKey = '';
    removePlaceholder();
    if (currentStyle && __STYLES[currentStyle]) __STYLES[currentStyle].destroy();
    currentStyle = name || '';
    if (currentStyle) localStorage.setItem('widgetStyle', currentStyle);
    if (__STYLES[currentStyle]) __STYLES[currentStyle].init();
    orient();
}

function handleTrackData(data) {
    if (!data) { showStatus(TXT[LANG].noMusic); return; }
    if (!lockedStyle && data._style && data._style !== currentStyle) applyStyle(data._style);
    else if (!currentStyle) applyStyle('classic');
    if (data.error) { showStatus(TXT[LANG].noMusic); return; }
    lastTrackData = data;
    widget.classList.add('active');
    widget.classList.remove('no-track');
    if (__STYLES[currentStyle]) __STYLES[currentStyle].show(data);
    resetWatchdog();
}

function showStatus(text) {
    showTrackKey = '';
    if (syncId) clearInterval(syncId);
    syncId = null;
    if (watchDog) clearTimeout(watchDog);
    marqueeGen++;
    cleanupMq();
    clearTimeout(marqueeTimer);
    marqueeTimer = null;
    widget.classList.add('active', 'no-track');
    if (currentStyle && __STYLES[currentStyle]) __STYLES[currentStyle].showStatus(text);
    else showPlaceholder(text);
}

async function connectObsWebSocket() {
    try {
        if (wsWidget && (wsWidget.readyState === WebSocket.OPEN || wsWidget.readyState === WebSocket.CONNECTING)) return;
        if (wsWidget) { try { wsWidget.close(); } catch(e) {} wsWidget = null; }
        var url = 'ws://127.0.0.1:' + WS_PORT;
        wsWidget = new WebSocket(url);
        wsWidget.onmessage = function(event) {
            try {
                var msg = JSON.parse(event.data);
                if (msg.op === 0) {
                    var identify = { op: 1, d: { rpcVersion: 1, eventSubscriptions: 0x7FFFFFFF } };
                    wsWidget.send(JSON.stringify(identify));
                } else if (msg.op === 2) { wsWidgetConnected = true;
                } else if (msg.op === 5 && msg.d.eventType === 'CustomEvent') { handleTrackData(msg.d.eventData); }
            } catch(e) {}
        };
        wsWidget.onclose = function() {
            wsWidget = null; wsWidgetConnected = false;
            showStatus(TXT[LANG].waiting);
            connectObsWebSocket();
        };
        wsWidget.onerror = function() { if (wsWidget) { try { wsWidget.close(); } catch(e) {} } };
    } catch(e) { connectObsWebSocket(); }
}

orient();
window.addEventListener('resize', orient);

var MOCK_DATA = new URLSearchParams(location.search).get('mock') ? {
    title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours',
    thumbnail: '', state: 'playing', currentTime: 138, duration: 200, ts: Date.now()
} : null;

var PREVIEW = new URLSearchParams(location.search).get('preview');
var INIT_STYLE = new URLSearchParams(location.search).get('style');
var CUSTOM_STYLE = null;
try {
    var styles = document.querySelectorAll('style');
    for (var i = 0; i < styles.length; i++) {
        var m = (styles[i].textContent || '').match(/-{2}widget-style\s*:\s*['"]?\s*([^;'"}\s]+)\s*['"]?\s*[;}]/);
        if (m) { CUSTOM_STYLE = m[1]; break; }
    }
} catch(e) {}

var SAVED_STYLE = localStorage.getItem('widgetStyle') || null;

if (CUSTOM_STYLE) { lockedStyle = CUSTOM_STYLE; applyStyle(CUSTOM_STYLE); showStatus(TXT[LANG].noMusic);
} else if (INIT_STYLE) { lockedStyle = INIT_STYLE; applyStyle(INIT_STYLE); showStatus(TXT[LANG].noMusic);
} else if (SAVED_STYLE) { applyStyle(SAVED_STYLE); showStatus(TXT[LANG].noMusic);
} else { showPlaceholder(TXT[LANG].waiting); }

// Retry CUSTOM_STYLE detection (OBS injects CSS after page load)
setTimeout(function() {
    if (lockedStyle || CUSTOM_STYLE) return;
    try {
        var styles = document.querySelectorAll('style');
        for (var i = 0; i < styles.length; i++) {
            var m = (styles[i].textContent || '').match(/-{2}widget-style\s*:\s*['"]?\s*([^;'"}\s]+)\s*['"]?\s*[;}]/);
            if (m) { CUSTOM_STYLE = m[1]; lockedStyle = CUSTOM_STYLE; applyStyle(CUSTOM_STYLE); showStatus(TXT[LANG].noMusic); break; }
        }
    } catch(e) {}
}, 300);

if (MOCK_DATA) {
    if (!currentStyle) applyStyle('stereo');
    lastTrackData = MOCK_DATA;
    if (__STYLES[currentStyle]) __STYLES[currentStyle].show(MOCK_DATA);
    resetWatchdog();
} else if (PREVIEW) {
    showPlaceholder(TXT[LANG].noMusic);
    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'trackData') {
            if (e.data.payload) { handleTrackData(e.data.payload);
            } else { showStatus(e.data.connected ? TXT[LANG].noMusic : TXT[LANG].waiting); }
        } else if (e.data && e.data.type === 'setStyle') {
            applyStyle(e.data.style);
            if (lastTrackData) { __STYLES[currentStyle].show(lastTrackData); resetWatchdog();
            } else { showStatus(TXT[LANG].noMusic); }
        }
    });
} else {
    if (!currentStyle) showPlaceholder(TXT[LANG].waiting);
    connectObsWebSocket();
}
