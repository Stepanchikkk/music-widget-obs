(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var link = document.createElement('link'); link.rel = 'stylesheet'; link.href = BASE + 'style.css'; document.head.appendChild(link);
var S = window.__STYLES = window.__STYLES || {};
var E = null, nodes = null, cachedThumb = '', chaosTimer = null;
var screenEl = null, resizeHandler = null, rAF = null;
var IMG_W = 1372, IMG_H = 809, DX = 148, DY = 120, DW = 948, DH = 531;

function reposition() {
    if (!screenEl) return;
    var w = widget.offsetWidth, h = widget.offsetHeight;
    if (!w || !h) return;
    var s = Math.min(w / IMG_W, h / IMG_H);
    var ox = (w - IMG_W * s) / 2, oy = (h - IMG_H * s) / 2;
    screenEl.style.left = (ox + DX * s) + 'px';
    screenEl.style.top = (oy + DY * s) + 'px';
    screenEl.style.width = (DW * s) + 'px';
    screenEl.style.height = (DH * s) + 'px';
    screenEl.style.fontSize = (DH * s / 100) + 'px';
}

var ICON_PLAY = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="display:inline-block;vertical-align:middle"><polygon points="7,4 20,12 7,20"/></svg>';
var ICON_PAUSE = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="display:inline-block;vertical-align:middle"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

function chaosFlicker() {
    var d = 5000 + Math.random() * 20000;
    chaosTimer = setTimeout(function() {
        var next = function() { chaosTimer = setTimeout(chaosFlicker, 4000 + Math.random() * 6000); };
        var r = Math.random();
        if (r < 0.25) {
            if (E && E.glitchEl) {
                var bars = Math.floor(2 + Math.random() * 5);
                var html = '';
                for (var i = 0; i < bars; i++) {
                    var top = Math.random() * 100;
                    var h = 0.3 + Math.random() * 1.5;
                    html += '<div style="position:absolute;left:0;right:0;top:' + top + '%;height:' + h + 'vh;background:rgba(0,255,0,0.3);border-top:0.1vh solid rgba(0,255,0,0.6);box-shadow:0 0 2vh rgba(0,255,0,0.25)"></div>';
                }
                E.glitchEl.innerHTML = html;
                E.glitchEl.style.display = 'block';
                chaosTimer = setTimeout(function() { if (E && E.glitchEl) E.glitchEl.style.display = 'none';
                    next(); }, 80 + Math.random() * 200);
            } else { next(); }
            return;
        }
        if (r < 0.45) {
            if (E && E.flashEl) {
                E.flashEl.style.display = 'block';
                chaosTimer = setTimeout(function() { if (E && E.flashEl) E.flashEl.style.display = 'none';
                    next(); }, 30 + Math.random() * 80);
            } else { next(); }
            return;
        }
        if (r < 0.65) {
            var dir = Math.random() > 0.5 ? '' : '-';
            screenEl.style.transform = 'translateX(' + dir + (1 + Math.random() * 2.5) + 'em) translateY(' + dir + (0.3 + Math.random() * 0.6) + 'em) skewX(' + dir + (0.5 + Math.random() * 1) + 'deg)';
            chaosTimer = setTimeout(function() { screenEl.style.transform = '';
                next(); }, 60 + Math.random() * 150);
            return;
        }
        screenEl.style.opacity = '0.7';
        chaosTimer = setTimeout(function() { screenEl.style.opacity = '';
            next(); }, 20 + Math.random() * 30);
    }, d);
}

function fmt2(n) {
    n = Math.max(0, Math.floor(n));
    return Math.floor(n/60) + ':' + (n%60).toString().padStart(2,'0');
}

function setArtwork(url) {
    if (!url) return;
    if (url === cachedThumb && E.artworkImg.classList.contains('visible')) return;
    cachedThumb = url;
    if (!E.artworkImg || !E.artworkNoimg) return;
    E.artworkImg.src = url;
    if (E.artworkImg.complete && E.artworkImg.naturalWidth > 0) {
        E.artworkImg.classList.add('visible');
        E.artworkNoimg.style.display = 'none';
    } else {
        E.artworkImg.onload = function() {
            E.artworkImg.classList.add('visible');
            E.artworkNoimg.style.display = 'none';
            E.artworkImg.onload = null;
        };
        E.artworkImg.onerror = function() {
            E.artworkImg.classList.remove('visible');
            E.artworkNoimg.style.display = 'flex';
            E.artworkImg.onerror = null;
        };
    }
}

S.fallout = {
    init: function() {
        widget.classList.add('fallout');
        

        var specHtml = '';
        for (var i = 0; i < 8; i++) {
            var delay = (Math.random() * 0.5).toFixed(2);
            var dur = (0.15 + Math.random() * 0.25).toFixed(2);
            var steps = (2 + Math.floor(Math.random() * 4));
            specHtml += '<div class="fallout-spectrum-bar" style="--d:' + dur + 's;--s:' + steps + ';--l:' + delay + 's"></div>';
        }

        var d = document.createElement('div');
        d.innerHTML = '<div class="fallout-topbar"><div class="fallout-tabs"><div class="fallout-tab active">MUSIC</div><div class="fallout-tab">PLAYLISTS</div><div class="fallout-tab">LIBRARY</div><div class="fallout-tab">STATUS</div><div class="fallout-tab">CONFIG</div></div><div class="fallout-indicators"><span class="fallout-indicator"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12a7 7 0 0 1 14 0"/><rect x="2" y="12" width="5" height="8" rx="1.5" stroke-width="2"/><rect x="17" y="12" width="5" height="8" rx="1.5" stroke-width="2"/></svg></span><span class="fallout-battery"><span class="fallout-battery-shell"><span class="fallout-battery-fill"></span></span></span></div></div><div class="fallout-main"><div class="fallout-artwork-wrap"><div class="fallout-artwork-block"><div class="fallout-artwork-frame"><img class="fallout-artwork-img" alt="" crossorigin="anonymous"><div class="fallout-artwork-noimg">[ NO SIGNAL ]</div></div></div></div><div class="fallout-info"><div class="fallout-track-label">&#9654; TRACK</div><div class="track-title-wrap"><div class="fallout-title"></div></div><div class="fallout-divider"></div><div class="fallout-metadata"><div class="fallout-meta-row"><div class="fallout-meta-label">ARTIST</div><div class="fallout-meta-value fallout-meta-artist"></div></div><div class="fallout-meta-row"><div class="fallout-meta-label">ALBUM</div><div class="fallout-meta-value fallout-meta-album"></div></div><div class="fallout-meta-row"><div class="fallout-meta-label">DURATION</div><div class="fallout-meta-value fallout-meta-duration">--:--</div></div></div><div class="fallout-progress"><div class="fallout-progress-bar"><div class="fallout-progress-fill"></div></div><div class="fallout-progress-time"><span class="fallout-time-elapsed">00:00</span><span class="fallout-time-remaining">-00:00</span></div></div><div class="fallout-controls"><span class="fallout-ctrl fallout-ctrl-prev">&#9664;&#9664;</span><span class="fallout-ctrl fallout-ctrl-play">' + ICON_PLAY + '</span><span class="fallout-ctrl fallout-ctrl-next">&#9654;&#9654;</span></div></div></div><div class="fallout-bottom"><div class="fallout-bottom-row"><span class="fallout-tech-info">BITRATE 320 kbps, 44.1 kHz, STEREO</span><div class="fallout-spectrum">' + specHtml + '</div></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        screenEl = document.createElement('div');
        screenEl.className = 'fallout-screen';
        while (widget.firstChild) { screenEl.appendChild(widget.firstChild); }
        widget.appendChild(screenEl);
        E = {
            artworkImg: screenEl.querySelector('.fallout-artwork-img'),
            artworkNoimg: screenEl.querySelector('.fallout-artwork-noimg'),

            trackLabel: screenEl.querySelector('.fallout-track-label'),
            titleEl: screenEl.querySelector('.fallout-title'),
            artistValue: screenEl.querySelector('.fallout-meta-artist'),
            albumValue: screenEl.querySelector('.fallout-meta-album'),
            durationValue: screenEl.querySelector('.fallout-meta-duration'),
            progressFill: screenEl.querySelector('.fallout-progress-fill'),
            timeElapsed: screenEl.querySelector('.fallout-time-elapsed'),
            timeRemaining: screenEl.querySelector('.fallout-time-remaining'),
            playCtrl: screenEl.querySelector('.fallout-ctrl-play'),
            spectrum: screenEl.querySelector('.fallout-spectrum')
        };
        cachedThumb = '';
        var g = document.createElement('div');
        g.style.cssText = 'position:absolute;inset:0;z-index:52;pointer-events:none;display:none';
        screenEl.appendChild(g);
        E.glitchEl = g;
        var f = document.createElement('div');
        f.style.cssText = 'position:absolute;inset:0;z-index:53;pointer-events:none;display:none;background:radial-gradient(ellipse at center,rgba(0,255,0,0.25) 0%,rgba(0,255,0,0.15) 50%,rgba(0,200,0,0.05) 100%)';
        screenEl.appendChild(f);
        E.flashEl = f;
        reposition();
        resizeHandler = function() { cancelAnimationFrame(rAF); rAF = requestAnimationFrame(reposition); };
        window.addEventListener('resize', resizeHandler);
        if (chaosTimer) clearTimeout(chaosTimer);
        chaosFlicker();
    },
    destroy: function() {
        widget.classList.remove('fallout');
        if (resizeHandler) { window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
        if (rAF) { cancelAnimationFrame(rAF); rAF = null; }
        if (screenEl) { screenEl.style.opacity = ''; screenEl.style.transform = ''; screenEl.remove(); screenEl = null; }
        if (nodes) { nodes.forEach(function(c){if(c.parentNode)c.remove()}); nodes = null; }
        if (E && E.glitchEl) { E.glitchEl.remove(); E.glitchEl = null; }
        if (E && E.flashEl) { E.flashEl.remove(); E.flashEl = null; }
        if (chaosTimer) clearTimeout(chaosTimer);
        chaosTimer = null;
        E = null; cachedThumb = '';
    },
    show: function(data) {
        if (!E) this.init();
        reposition();
        widget.classList.remove('no-track');

        var newKey = (data.title||'') + '|' + (data.artist||'') + '|' + (data.thumbnail||'');
        var isNew = newKey !== showTrackKey;
        if (isNew) showTrackKey = newKey;
        if (isNew) {
            var _mg = marqueeGen;
            setMarqueeText(E.titleEl, (data.title || '').toUpperCase(), _mg);
            clearTimeout(marqueeTimer);
            marqueeTimer = setTimeout(function(){if(_mg===marqueeGen&&marqueeItems.length>0)marqueeCycle(_mg);},1200);
        }
        E.artistValue.textContent = data.artist || '';
        E.albumValue.textContent = data.album || '';
                E.durationValue.textContent = data.duration > 0 ? fmt2(data.duration) : '--:--';
        E.trackLabel.innerHTML = ICON_PLAY + ' TRACK';
        E.playCtrl.innerHTML = data.state === 'paused' ? ICON_PLAY : ICON_PAUSE;

        if (data.thumbnail) {
            setArtwork(data.thumbnail);
        } else {
            cachedThumb = '';
            E.artworkImg.classList.remove('visible');
            E.artworkNoimg.style.display = 'flex';
        }

        if (syncId) clearInterval(syncId);
        if (data.duration > 0) {
            var adj = data.state === 'paused' ? data.currentTime : data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
            if (adj > data.duration) adj = data.duration;
            var pct = Math.min(adj/data.duration*100, 100);
            E.progressFill.style.width = pct + '%';
            E.timeElapsed.textContent = fmt2(adj);
            E.timeRemaining.textContent = '-' + fmt2(data.duration - adj);
            if (data.state !== 'paused') {
                var bt = adj, ts = Date.now(), dur = data.duration;
                syncId = setInterval(function() {
                    var cur = bt + (Date.now() - ts) / 1000;
                    if (cur >= dur) { bt = 0; ts = Date.now(); cur = 0; }
                    if (cur > dur) cur = dur;
                    E.progressFill.style.width = (cur/dur*100) + '%';
                    E.timeElapsed.textContent = fmt2(cur);
                    E.timeRemaining.textContent = '-' + fmt2(dur - cur);
                }, 1000);
            }
        } else {
            E.progressFill.style.width = '0%';
            E.timeElapsed.textContent = '00:00';
            E.timeRemaining.textContent = '-00:00';
        }

        if (data.state === 'playing') {
            E.spectrum.classList.add('playing');
        } else {
            E.spectrum.classList.remove('playing');
        }
    },
    showStatus: function(text) {
        if (!E) return;
        reposition();
        var _mg = marqueeGen;
        setMarqueeText(E.titleEl, (text || '').toUpperCase(), _mg);
        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(function(){if(_mg===marqueeGen&&marqueeItems.length>0)marqueeCycle(_mg);},1200);
        E.artistValue.textContent = '';
        E.albumValue.textContent = '';

        E.durationValue.textContent = '--:--';
        E.trackLabel.innerHTML = ICON_PLAY + ' TRACK';
        E.playCtrl.innerHTML = ICON_PLAY;
        E.progressFill.style.width = '0%';
        E.timeElapsed.textContent = '00:00';
        E.timeRemaining.textContent = '';
        E.artworkImg.classList.remove('visible');
        E.artworkNoimg.style.display = 'flex';
        E.spectrum.classList.remove('playing');
        cachedThumb = '';
        if (syncId) clearInterval(syncId);
    }
};
})();
