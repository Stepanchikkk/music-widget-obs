const WS_PORT = new URLSearchParams(location.search).get('port') || '4455';
const LANG = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru';
const TXT = {
    ru: { noMusic: 'Нет воспроизведения', waiting: 'Ожидание подключения...' },
    en: { noMusic: 'No music playing', waiting: 'Waiting for connection...' }
};
let lastKey = '';
let isPaused = false;
let duration = 0;
let syncId = null;

let wsWidget = null;
let wsWidgetConnected = false;
let watchDog = null;
let currentStyle = '';

const MOCK_DATA = new URLSearchParams(location.search).get('mock') ? {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    thumbnail: '',
    state: 'playing',
    currentTime: 138,
    duration: 200,
    ts: Date.now()
} : null;

const PREVIEW = new URLSearchParams(location.search).get('preview');

const $ = id => document.getElementById(id);
const widget = $('widget');
const artwork = $('artwork');
const artworkBg = $('artwork-bg');
const titleEl = $('title');
const artistEl = $('artist');
const albumEl = $('album');
const timingEl = $('timing');
const stateBtn = $('state-btn');
const progressFill = $('progress');
const colorCanvas = $('colorAnalyzer');
let stereoDisplay = null;

const SVG_PLAY = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 20,12 7,20"/></svg>`;
const SVG_PAUSE = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;

function orient() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    widget.classList.remove('h', 'v');
    if (h >= w) {
        widget.classList.add('v');
    } else {
        widget.classList.add('h');
    }
}

function applyStyle(name) {
    currentStyle = name || '';
    widget.classList.remove('compact', 'glass', 'minimal', 'stereo');

    if (name === 'stereo') {
        if (!stereoDisplay) {
            stereoDisplay = document.createElement('div');
            stereoDisplay.id = 'stereo-display';
            stereoDisplay.className = 'stereo-display';
            widget.appendChild(stereoDisplay);
        }
        widget.classList.add('stereo');
    } else {
        if (stereoDisplay) {
            stereoDisplay.remove();
            stereoDisplay = null;
        }
    }

    if (name === 'compact') widget.classList.add('compact');
    else if (name === 'glass') widget.classList.add('glass');
    else if (name === 'minimal') widget.classList.add('minimal');

    if (name === 'minimal' || name === 'glass' || name === 'stereo') resetColors();
}

function fmt(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s/60) + ':' + (s%60).toString().padStart(2,'0');
}

function colors(img) {
    const c = colorCanvas.getContext('2d', { willReadFrequently: true });
    colorCanvas.width = 8; colorCanvas.height = 8;
    c.drawImage(img, 0, 0, 8, 8);
    const d = c.getImageData(0, 0, 8, 8).data;
    const p = [];
    for (let i = 0; i < d.length; i += 4) p.push([d[i], d[i+1], d[i+2]]);
    p.sort((a,b) => (a[0]+a[1]+a[2]) - (b[0]+b[1]+b[2]));
    return { dark: p[Math.floor(p.length*0.1)], light: p[Math.floor(p.length*0.7)] };
}

function applyColors(d, l) {
    if (widget.classList.contains('glass') || widget.classList.contains('minimal')) return;
    const da = (d[0]+d[1]+d[2])/3;
    if (da > 90) d = d.map(v => Math.max(v*0.25, 8)|0);
    widget.style.background = `linear-gradient(135deg, rgba(${d[0]},${d[1]},${d[2]},0.96), rgba(${Math.min(d[0]+55,255)},${Math.min(d[1]+55,255)},${Math.min(d[2]+55,255)},0.92))`;
    const b = (l[0]*299+l[1]*587+l[2]*114)/1000;
    const a = b < 80 ? l.map(v => Math.min(v+120,255)) : l;
    widget.style.setProperty('--accent-1', `rgb(${a[0]},${a[1]},${a[2]})`);
    widget.style.setProperty('--accent-2', `rgb(${Math.min(a[0]+40,255)},${Math.min(a[1]+40,255)},${Math.min(a[2]+40,255)})`);
}

function resetColors() {
    if (widget.classList.contains('glass') || widget.classList.contains('minimal') || currentStyle === 'stereo') {
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

function tick(adj, dur) {
    if (syncId) clearInterval(syncId);
    let bt = adj, ts = Date.now();
    syncId = setInterval(() => {
        const cur = bt + (Date.now() - ts) / 1000;
        if (cur >= dur) { bt = 0; ts = Date.now(); }
        const t = fmt(cur) + ' / ' + fmt(dur);
        timingEl.textContent = t;
        progressFill.style.width = Math.min(cur/dur*100, 100) + '%';
    }, 1000);
}

// ===== MARQUEE =====
let marqueeItems = [];
let marqueeGen = 0;
let marqueeTimer = null;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function setMarqueeText(el, text, gen) {
    if (gen !== marqueeGen) return;
    if (!text) { el.classList.remove('active'); el.innerHTML = ''; return; }
    el.classList.remove('active');
    el.innerHTML = `<span>${text}</span>`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (gen !== marqueeGen) return;
            const wrap = el.closest('.track-title-wrap, .track-artist-wrap, .track-album-wrap');
            if (!wrap) return;
            const cw = wrap.clientWidth;
            const span = el.querySelector('span');
            const tw = span.getBoundingClientRect().width;
            const pr = parseFloat(getComputedStyle(span).paddingRight) || 0;
            if (tw - pr > cw + 2) {
                el.innerHTML = `<span>${text}</span><span>${text}</span>`;
                        const dur = Math.max(4000, (tw / 90) * 1000);
                el.style.setProperty('--marquee-duration', (dur / 1000) + 's');
                const existing = marqueeItems.find(i => i.el === el);
                if (existing) { existing.text = text; existing.dur = dur; }
                else marqueeItems.push({ el, text, dur });
            } else {
                el.innerHTML = `<span>${text}</span>`;
                const idx = marqueeItems.findIndex(i => i.el === el);
                if (idx !== -1) marqueeItems.splice(idx, 1);
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

        for (const item of marqueeItems) {
            if (gen !== marqueeGen) return;
            await sleep(2500);
            if (gen !== marqueeGen) return;

            item.el.classList.add('active');
            await sleep(item.dur + 500);
            if (gen !== marqueeGen) return;

            item.el.classList.remove('active');
            await sleep(1500);
        }

        if (gen !== marqueeGen) return;
        await sleep(5000);
    }
}

function cleanupMq() {
    marqueeItems.forEach(item => item.el.classList.remove('active'));
    marqueeItems = [];
    clearTimeout(marqueeTimer);
    marqueeTimer = null;
}

var showTrackKey = '';
var lastColorStyle = '';

function show(data) {
    const newKey = (data.title||'') + '|' + (data.artist||'') + '|' + (data.thumbnail||'');
    const isNew = newKey !== showTrackKey;
    if (isNew) showTrackKey = newKey;

    widget.classList.add('active');
    widget.classList.remove('no-track');

    if (currentStyle === 'stereo') {
        if (stereoDisplay) stereoDisplay.textContent = (data.title || '') + ' - ' + (data.artist || '');
        lastColorStyle = 'stereo';
        resetWatchdog();
        return;
    }

    if (isNew) {
        marqueeGen++;
        cleanupMq();
        const gen = marqueeGen;

        setMarqueeText(titleEl, data.title || '', gen);
        setMarqueeText(artistEl, data.artist || '', gen);
        setMarqueeText(albumEl, data.album || '', gen);

        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(() => {
            if (gen === marqueeGen && marqueeItems.length > 0) {
                marqueeCycle(gen);
            }
        }, 1200);
    }

    isPaused = data.state === 'paused';
    stateBtn.innerHTML = isPaused ? SVG_PLAY : SVG_PAUSE;

    if (isNew) {
        if (data.thumbnail) {
            artwork.src = data.thumbnail;
            if (widget.classList.contains('glass')) {
                widget.style.setProperty('--glass-artwork', `url(${data.thumbnail})`);
            }
            if (artwork.complete && artwork.naturalWidth > 0) {
                artwork.classList.add('visible');
                artworkBg.classList.add('hidden');
                try { const c = colors(artwork); applyColors(c.dark, c.light); } catch(e) {}
                lastColorStyle = currentStyle;
            } else {
                artwork.onload = () => {
                    artwork.classList.add('visible');
                    artworkBg.classList.add('hidden');
                    try { const c = colors(artwork); applyColors(c.dark, c.light); } catch(e) {}
                };
                artwork.onerror = () => {
                    artwork.classList.remove('visible');
                    artworkBg.classList.remove('hidden');
                    resetColors();
                    lastColorStyle = currentStyle;
                };
            }
        } else {
            artwork.classList.remove('visible');
            artworkBg.classList.remove('hidden');
            widget.style.removeProperty('--glass-artwork');
            if (currentStyle !== 'glass' && currentStyle !== 'minimal' && currentStyle !== 'stereo') resetColors();
            lastColorStyle = currentStyle;
        }
    } else if (currentStyle !== lastColorStyle) {
        lastColorStyle = currentStyle;
        if (currentStyle !== 'glass' && currentStyle !== 'minimal') {
            if (artwork.classList.contains('visible') && artwork.complete && artwork.naturalWidth > 0) {
                try { const c = colors(artwork); applyColors(c.dark, c.light); } catch(e) {}
            } else {
                resetColors();
            }
        } else {
            resetColors();
        }
    }

    progressFill.className = 'progress-fill' + (isPaused ? ' paused' : '');

    if (syncId) clearInterval(syncId);

    if (data.duration > 0) {
        duration = data.duration;
        const adj = data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
        const t = fmt(adj) + ' / ' + fmt(duration);
        timingEl.textContent = t;
        progressFill.style.width = Math.min(adj/duration*100, 100) + '%';
        if (!isPaused) tick(adj, duration);
    } else {
        timingEl.textContent = '';
        progressFill.style.width = '0%';
    }
    resetWatchdog();
}

function showStatus(text) {
    showTrackKey = '';
    if (currentStyle === 'stereo') {
        if (syncId) clearInterval(syncId);
        if (watchDog) clearTimeout(watchDog);
        widget.classList.add('active', 'no-track');
        if (stereoDisplay) stereoDisplay.textContent = '';
        return;
    }

    if (syncId) clearInterval(syncId);
    if (watchDog) clearTimeout(watchDog);
    marqueeGen++;
    cleanupMq();
    clearTimeout(marqueeTimer);
    marqueeTimer = null;

    widget.classList.add('active', 'no-track');

    artwork.classList.remove('visible');
    artworkBg.classList.remove('hidden');
    resetColors();

    titleEl.textContent = text;
    artistEl.textContent = '';
    albumEl.textContent = '';
    timingEl.textContent = '';
    stateBtn.innerHTML = '';
    progressFill.style.width = '0%';
    progressFill.className = 'progress-fill';
}

function resetWatchdog() {
    if (watchDog) clearTimeout(watchDog);
    watchDog = setTimeout(() => showStatus(TXT[LANG].noMusic), 3000);
}

function handleTrackData(data) {
    if (!data) { showStatus(TXT[LANG].noMusic); return; }
    if (data._style) applyStyle(data._style);
    if (data.error) { showStatus(TXT[LANG].noMusic); return; }
    duration = data.duration || 0;
    show(data);
}

async function connectObsWebSocket() {
    try {
        if (wsWidget && (wsWidget.readyState === WebSocket.OPEN || wsWidget.readyState === WebSocket.CONNECTING)) {
            return;
        }

        if (wsWidget) {
            try { wsWidget.close(); } catch (e) {}
            wsWidget = null;
        }

        const url = 'ws://127.0.0.1:' + WS_PORT;
        wsWidget = new WebSocket(url);

        wsWidget.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                if (msg.op === 0) {
                    const identify = {
                        op: 1,
                        d: {
                            rpcVersion: 1,
                            eventSubscriptions: 0x7FFFFFFF
                        }
                    };

                    /* auth disabled
                    if (msg.d.authentication && WS_PASSWORD) {
                        const enc = new TextEncoder();
                        crypto.subtle.digest('SHA-256', enc.encode(WS_PASSWORD + msg.d.authentication.salt)).then((secretBuf) => {
                            const secret = btoa(String.fromCharCode(...new Uint8Array(secretBuf)));
                            return crypto.subtle.digest('SHA-256', enc.encode(secret + msg.d.authentication.challenge));
                        }).then((authBuf) => {
                            identify.d.authentication = btoa(String.fromCharCode(...new Uint8Array(authBuf)));
                            wsWidget.send(JSON.stringify(identify));
                        }).catch(() => {});
                    } else {
                        wsWidget.send(JSON.stringify(identify));
                    }
                    */
                    wsWidget.send(JSON.stringify(identify));
                } else if (msg.op === 2) {
                    wsWidgetConnected = true;
                } else if (msg.op === 5 && msg.d.eventType === 'CustomEvent') {
                    handleTrackData(msg.d.eventData);
                }
            } catch (e) {}
        };

        wsWidget.onclose = () => {
            wsWidget = null;
            wsWidgetConnected = false;
            showStatus(TXT[LANG].waiting);
            connectObsWebSocket();
        };

        wsWidget.onerror = () => {
            if (wsWidget) {
                try { wsWidget.close(); } catch (e) {}
            }
        };
    } catch (e) {
        connectObsWebSocket();
    }
}

orient();
window.addEventListener('resize', orient);

const INIT_STYLE = new URLSearchParams(location.search).get('style');
if (INIT_STYLE) applyStyle(INIT_STYLE);

if (MOCK_DATA) {
    if (!INIT_STYLE) applyStyle('stereo');
    duration = MOCK_DATA.duration;
    show(MOCK_DATA);
} else if (PREVIEW) {
    showStatus(TXT[LANG].noMusic);
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'trackData') {
            if (e.data.payload) {
                handleTrackData(e.data.payload);
            } else {
                showStatus(e.data.connected ? TXT[LANG].noMusic : TXT[LANG].waiting);
            }
        } else if (e.data && e.data.type === 'setStyle') {
            applyStyle(e.data.style);
        }
    });
} else {
    showStatus(TXT[LANG].noMusic);
    connectObsWebSocket();
}
