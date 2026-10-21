var __STYLES = window.__STYLES || {};

function getWsPort() {
    var v = '';
    try { v = getComputedStyle(document.documentElement).getPropertyValue('--obs-ws-port').trim(); } catch(e) {}
    if (/^\d+$/.test(v)) return v;
    var q = new URLSearchParams(location.search).get('port');
    return q || '4455';
}
function getWsPassword() {
    var b64 = '';
    try { b64 = getComputedStyle(document.documentElement).getPropertyValue('--obs-ws-password-b64').trim().replace(/^['"]|['"]$/g, ''); } catch(e) {}
    if (!b64) return '';
    try {
        var bin = atob(b64), bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new TextDecoder().decode(bytes);
    } catch(e) { return ''; }
}
function sha256B64js(str) {
    var bytes = new TextEncoder().encode(str);
    var K = [
        0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
        0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
        0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
        0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
        0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
        0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
        0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
        0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
    ];
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    var l = bytes.length;
    var total = ((l + 9 + 63) >> 6) << 6;
    var m = new Uint8Array(total);
    m.set(bytes);
    m[l] = 0x80;
    var bitLen = l * 8;
    m[total-1] = bitLen & 255;
    m[total-2] = (bitLen >>> 8) & 255;
    m[total-3] = (bitLen >>> 16) & 255;
    m[total-4] = (bitLen >>> 24) & 255;
    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    for (var off = 0; off < total; off += 64) {
        var w = new Array(64);
        for (var i = 0; i < 16; i++) {
            w[i] = (m[off+i*4] << 24) | (m[off+i*4+1] << 16) | (m[off+i*4+2] << 8) | m[off+i*4+3];
        }
        for (var i = 16; i < 64; i++) {
            var s0 = rotr(w[i-15],7) ^ rotr(w[i-15],18) ^ (w[i-15] >>> 3);
            var s1 = rotr(w[i-2],17) ^ rotr(w[i-2],19) ^ (w[i-2] >>> 10);
            w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
        }
        var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
        for (var i = 0; i < 64; i++) {
            var S1 = rotr(e,6) ^ rotr(e,11) ^ rotr(e,25);
            var ch = (e & f) ^ (~e & g);
            var t1 = (h + S1 + ch + K[i] + w[i]) | 0;
            var S0 = rotr(a,2) ^ rotr(a,13) ^ rotr(a,22);
            var maj = (a & b) ^ (a & c) ^ (b & c);
            var t2 = (S0 + maj) | 0;
            h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    var out = new Uint8Array(32);
    for (var i = 0; i < 8; i++) {
        out[i*4] = (H[i] >>> 24) & 255;
        out[i*4+1] = (H[i] >>> 16) & 255;
        out[i*4+2] = (H[i] >>> 8) & 255;
        out[i*4+3] = H[i] & 255;
    }
    var bin = '';
    for (var i = 0; i < out.length; i++) bin += String.fromCharCode(out[i]);
    return btoa(bin);
}
async function sha256b64(str) {
    try {
        if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
            var buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
            var bytes = new Uint8Array(buf), bin = '';
            for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
            return btoa(bin);
        }
    } catch (e) {}
    return sha256B64js(str);
}
async function computeAuth(password, salt, challenge) {
    var secret = await sha256b64(password + salt);
    return await sha256b64(secret + challenge);
}
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
var widgetReconnectDelay = 1000;
var widgetReconnectTimer = null;

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
    if (forStyle === 'glass' || forStyle === 'glass-compact' || forStyle === 'minimal') return;
    var da = (d[0]+d[1]+d[2])/3;
    if (da > 90) d = [Math.max(d[0]*0.25,8)|0, Math.max(d[1]*0.25,8)|0, Math.max(d[2]*0.25,8)|0];
    widget.style.background = 'linear-gradient(135deg, rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',0.96), rgba(' + Math.min(d[0]+55,255) + ',' + Math.min(d[1]+55,255) + ',' + Math.min(d[2]+55,255) + ',0.92))';
    var b = (l[0]*299+l[1]*587+l[2]*114)/1000;
    var a = b < 80 ? [Math.min(l[0]+120,255), Math.min(l[1]+120,255), Math.min(l[2]+120,255)] : l;
    widget.style.setProperty('--accent-1', 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
    widget.style.setProperty('--accent-2', 'rgb(' + Math.min(a[0]+40,255) + ',' + Math.min(a[1]+40,255) + ',' + Math.min(a[2]+40,255) + ')');
}

function resetColors(forStyle) {
    if (forStyle === 'glass' || forStyle === 'glass-compact' || forStyle === 'minimal' || forStyle === 'stereo' || forStyle === 'fallout') {
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

function marqueeCps() {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--marquee-cps'));
    return (v > 0) ? v : 3;
}

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
                var chars = Math.max(1, Array.from(text).length);
                var textW = Math.max(1, tw - pr);
                var gap = cw;
                var spans = el.querySelectorAll('span');
                for (var k = 0; k < spans.length; k++) spans[k].style.paddingRight = gap + 'px';
                var speedPx = (textW / chars) * marqueeCps();
                var dur = Math.max(1000, ((textW + gap) / speedPx) * 1000);
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
    watchDog = setTimeout(function() { showStatus(TXT[LANG].noMusic); }, 30000);
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
    if (currentStyle && !lockedStyle) localStorage.setItem('widgetStyle', currentStyle);
    if (__STYLES[currentStyle]) __STYLES[currentStyle].init();
    orient();
}

function handleTrackData(data) {
    if (!data) { showStatus(TXT[LANG].noMusic); return; }
    if (!lockedStyle && data._style && data._style !== currentStyle) applyStyle(data._style);
    else if (!currentStyle) applyStyle('classic');
    if (data.error) { lastTrackData = null; showStatus(TXT[LANG].noMusic); return; }
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
        var url = 'ws://127.0.0.1:' + getWsPort();
        wsWidget = new WebSocket(url);
        wsWidget.onmessage = function(event) {
            try {
                var msg = JSON.parse(event.data);
                if (msg.op === 0) {
                    var identify = { op: 1, d: { rpcVersion: 1, eventSubscriptions: 0x7FFFFFFF } };
                    var auth = msg.d.authentication;
                    if (auth) {
                        var pass = getWsPassword();
                        if (!pass) { try { wsWidget.close(); } catch(e) {} return; }
                        computeAuth(pass, auth.salt, auth.challenge).then(function(a) {
                            identify.d.authentication = a;
                            try { if (wsWidget) wsWidget.send(JSON.stringify(identify)); } catch(e) {}
                        }).catch(function() { try { if (wsWidget) wsWidget.close(); } catch(e) {} });
                        return;
                    }
                    wsWidget.send(JSON.stringify(identify));
                } else if (msg.op === 2) { wsWidgetConnected = true; widgetReconnectDelay = 1000;
                    setTimeout(function() { if (!lastTrackData && !widget.classList.contains('no-track')) showStatus(TXT[LANG].noMusic); }, 2000);
                } else if (msg.op === 5 && msg.d.eventType === 'CustomEvent') { handleTrackData(msg.d.eventData); }
            } catch(e) {}
        };
        wsWidget.onclose = function() {
            wsWidget = null; wsWidgetConnected = false;
            showStatus(TXT[LANG].waiting);
            scheduleWidgetConnect();
        };
        wsWidget.onerror = function() { if (wsWidget) { try { wsWidget.close(); } catch(e) {} } };
    } catch(e) { scheduleWidgetConnect(); }
}

function scheduleWidgetConnect() {
    if (widgetReconnectTimer) return;
    widgetReconnectTimer = setTimeout(function() {
        widgetReconnectTimer = null;
        connectObsWebSocket();
    }, widgetReconnectDelay);
    widgetReconnectDelay = Math.min(widgetReconnectDelay * 2, 3000);
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
