(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null, cachedThumb = '', chaosTimer = null;

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
            widget.style.transform = 'translateX(' + dir + (1 + Math.random() * 2.5) + 'vh) translateY(' + dir + (0.3 + Math.random() * 0.6) + 'vh) skewX(' + dir + (0.5 + Math.random() * 1) + 'deg)';
            chaosTimer = setTimeout(function() { widget.style.transform = '';
                next(); }, 60 + Math.random() * 150);
            return;
        }
        widget.style.opacity = '0.7';
        chaosTimer = setTimeout(function() { widget.style.opacity = '';
            next(); }, 20 + Math.random() * 30);
    }, d);
}

function fmt2(n) {
    n = Math.max(0, Math.floor(n));
    return Math.floor(n/60) + ':' + (n%60).toString().padStart(2,'0');
}

function setArtwork(url) {
    if (!url || url === cachedThumb) return;
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
        styleEl = document.createElement('style');
        var P = location.protocol === 'chrome-extension:' ? '' : 'extension/';
        var css = '@import url("https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap");';
        css += '@import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");';
        css += '.fallout{background:#0a0a0a!important;font-family:"Share Tech Mono","PT Mono",Consolas,monospace;color:#33ff33;border-radius:0!important;overflow:hidden;position:relative;flex-direction:column!important;align-items:stretch!important}.fallout.no-track{justify-content:flex-start!important}';
css += '.fallout::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 1vh,rgba(0,10,0,0.35) 1vh,rgba(0,10,0,0.35) 2vh);background-size:100% 2vh;pointer-events:none;z-index:50;animation:fallout-scroll 3s linear infinite}';
css += '.fallout::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,10,0,0.6) 100%);pointer-events:none;z-index:49}';
css += '@keyframes fallout-scroll{0%{background-position:0 0}100%{background-position:0 2vh}}';
        css += '.fallout-topbar{height:10vh;display:flex;align-items:center;padding:0 1.5vw;border-bottom:0.5vh solid #1a7a1a;flex-shrink:0;position:relative;z-index:1}';
        css += '.fallout-tabs{display:flex;flex:1;align-items:center;height:100%;justify-content:space-evenly;gap:0.4vw;position:relative}';
        css += '.fallout-tab{font-size:5vh;text-transform:uppercase;letter-spacing:0.2vw;color:#1a7a1a;cursor:default;height:100%;display:flex;align-items:center;position:relative;padding:0 1vw}';
        css += '.fallout-tab.active{color:#33ff33;padding:0 1.5vw;background-image:linear-gradient(#1a7a1a,#1a7a1a);background-size:1vh 50%;background-position:right 0 bottom 0;background-repeat:no-repeat}';
        css += '.fallout-tab.active::before{content:"";position:absolute;left:0;bottom:0;width:1vh;height:50%;background:#1a7a1a;pointer-events:none;z-index:2}';
        css += '.fallout-tab.active::after{content:"";position:absolute;bottom:-0.5vh;left:0;right:0;height:0.5vh;background:#0a0a0a;pointer-events:none;z-index:2}';
        css += '.fallout-indicators{display:flex;align-items:center;gap:1.5vw;flex-shrink:0}';
        css += '.fallout-indicator{font-size:5.5vh;color:#1a7a1a;display:inline-flex;align-items:center;line-height:1}';
        css += '.fallout-battery{display:inline-flex;align-items:center;color:#1a7a1a}';
        css += '.fallout-battery-shell{display:inline-block;width:12vh;height:4.5vh;border:0.3vh solid currentColor;border-radius:0.6vh;padding:0.5vh;position:relative}';
        css += '.fallout-battery-shell::after{content:"";position:absolute;right:-0.8vh;top:50%;transform:translateY(-50%);width:0.5vh;height:2vh;background:currentColor;border-radius:0 0.3vh 0.3vh 0}';
        css += '.fallout-battery-fill{display:block;height:100%;width:60%;background:currentColor;border-radius:0.2vh}';
        css += '.fallout-main{flex:1;display:flex;flex-direction:row;min-height:0;position:relative;z-index:1}';
        css += '.fallout-artwork-wrap{width:39%;display:flex;align-items:center;justify-content:center;padding:1.5vh;position:relative}';
        css += '.fallout-artwork-block{width:100%;max-width:100%;max-height:100%;aspect-ratio:1;position:relative;overflow:hidden;border:0.12vh solid #1a7a1a;background:#050505}';
        css += '.fallout-artwork-frame{position:absolute;inset:0;bottom:5vh;overflow:hidden}';
        css += '.fallout-artwork-img{width:100%;height:100%;object-fit:cover;display:none;filter:grayscale(1) sepia(1) hue-rotate(90deg) saturate(4) contrast(1.2)}';
        css += '.fallout-artwork-img.visible{display:block}';
        css += '.fallout-artwork-noimg{position:absolute;inset:0;bottom:5vh;display:flex;align-items:center;justify-content:center;color:#1a7a1a;font-size:6vh;text-transform:uppercase;letter-spacing:0.5vw;z-index:2}';
        css += '.fallout-artwork-caption{position:absolute;bottom:0;left:0;right:0;height:5vh;display:flex;align-items:center;justify-content:center;font-size:4vh;text-transform:uppercase;color:#1a7a1a;text-align:center;overflow:hidden;white-space:nowrap;border-top:0.08vh solid #1a7a1a;padding:0 0.8vw}';
        css += '.fallout-info{flex:1;display:flex;flex-direction:column;justify-content:center;padding:1.5vh 2.5vw;min-width:0;overflow:hidden;gap:0.5vh;position:relative}.fallout-info::after{content:"";position:absolute;right:0;top:0;width:50%;height:90%;background:url(' + P + 'pip-boy.png) no-repeat right center/contain;opacity:0.4;pointer-events:none;z-index:0}';
        css += '.fallout-info>*{position:relative;z-index:1}';
        css += '.fallout-track-label{font-size:5vh;color:#1a7a1a;text-transform:uppercase;letter-spacing:0.2vw}';
        css += '.track-title-wrap{white-space:nowrap;overflow:hidden;min-width:0}';
        css += '.fallout-title{font-size:11vh;text-transform:uppercase;color:#33ff33;text-shadow:0 0 1vh rgba(51,255,51,0.5);line-height:1.15;white-space:nowrap;display:inline-block;will-change:transform}';
        css += '.fallout-title.active{animation:fallout-marquee var(--marquee-duration,12s) linear 1 forwards}';
        css += '.fallout-title span{display:inline-block;padding-right:3em}';
        css += '@keyframes fallout-marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        css += '.fallout-divider{height:0.1vh;background:#1a7a1a;margin:0.2vh 0}';
        css += '.fallout-metadata{display:flex;flex-direction:column}';
        css += '.fallout-meta-row{display:flex;align-items:baseline;gap:2vw;padding:0.5vh 0}';
        css += '.fallout-meta-label{font-size:6.5vh;color:#1a7a1a;text-transform:uppercase;min-width:12vw;flex-shrink:0}';
        css += '.fallout-meta-value{font-size:8.5vh;color:#33ff33;text-transform:uppercase;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}';
        css += '.fallout-progress{margin:0.3vh 0}';
        css += '.fallout-progress-bar{height:3.5vh;border:0.12vh solid #1a7a1a;position:relative;overflow:hidden;background:transparent}';
        css += '.fallout-progress-fill{height:100%;width:0%;background:#33ff33;transition:width 1s linear}';
        css += '.fallout-progress-time{display:flex;justify-content:space-between;font-size:5.5vh;color:#1a7a1a;margin-top:0.3vh}';
        css += '.fallout-time-elapsed{color:#33ff33}';
        css += '.fallout-controls{display:flex;align-items:center;gap:2vw;margin-top:0.3vh}';
        css += '.fallout-ctrl{font-size:6.5vh;color:#1a7a1a;cursor:default;letter-spacing:0.2vw}';
        css += '.fallout-ctrl-play{font-size:10vh;color:#33ff33;display:inline-flex;align-items:center;justify-content:center}';
        css += '.fallout-bottom{border-top:0.12vh solid #1a7a1a;height:9vh;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:1}';
        css += '.fallout-bottom-row{display:flex;align-items:center;justify-content:space-between;padding:0 1.5vw}';
        css += '.fallout-tech-info{font-size:5vh;color:#1a7a1a;letter-spacing:0.2vw}';
        css += '.fallout-spectrum{display:flex;align-items:flex-end;gap:0.5vw;height:7vh}';
        css += '.fallout-spectrum-bar{width:2vw;background:#1a7a1a;height:1vh;animation:none}';
        css += '.fallout-spectrum.playing .fallout-spectrum-bar{animation:fallout-spec var(--d,.3s) steps(var(--s,3)) var(--l,0s) infinite alternate}';
        css += '@keyframes fallout-spec{0%{height:1vh;background:#1a7a1a}100%{height:6.5vh;background:#33ff33}}';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);

        var specHtml = '';
        for (var i = 0; i < 8; i++) {
            var delay = (Math.random() * 0.5).toFixed(2);
            var dur = (0.15 + Math.random() * 0.25).toFixed(2);
            var steps = (2 + Math.floor(Math.random() * 4));
            specHtml += '<div class="fallout-spectrum-bar" style="--d:' + dur + 's;--s:' + steps + ';--l:' + delay + 's"></div>';
        }

        var d = document.createElement('div');
        d.innerHTML = '<div class="fallout-topbar"><div class="fallout-tabs"><div class="fallout-tab active">MUSIC</div><div class="fallout-tab">PLAYLISTS</div><div class="fallout-tab">LIBRARY</div><div class="fallout-tab">STATUS</div><div class="fallout-tab">CONFIG</div></div><div class="fallout-indicators"><span class="fallout-indicator"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12a7 7 0 0 1 14 0"/><rect x="2" y="12" width="5" height="8" rx="1.5" stroke-width="2"/><rect x="17" y="12" width="5" height="8" rx="1.5" stroke-width="2"/></svg></span><span class="fallout-battery"><span class="fallout-battery-shell"><span class="fallout-battery-fill"></span></span></span></div></div><div class="fallout-main"><div class="fallout-artwork-wrap"><div class="fallout-artwork-block"><div class="fallout-artwork-frame"><img class="fallout-artwork-img" alt="" crossorigin="anonymous"><div class="fallout-artwork-noimg">[ NO SIGNAL ]</div></div><div class="fallout-artwork-caption"></div></div></div><div class="fallout-info"><div class="fallout-track-label">&#9654; TRACK</div><div class="track-title-wrap"><div class="fallout-title"></div></div><div class="fallout-divider"></div><div class="fallout-metadata"><div class="fallout-meta-row"><div class="fallout-meta-label">ARTIST</div><div class="fallout-meta-value fallout-meta-artist"></div></div><div class="fallout-meta-row"><div class="fallout-meta-label">ALBUM</div><div class="fallout-meta-value fallout-meta-album"></div></div><div class="fallout-meta-row"><div class="fallout-meta-label">DURATION</div><div class="fallout-meta-value fallout-meta-duration">--:--</div></div></div><div class="fallout-progress"><div class="fallout-progress-bar"><div class="fallout-progress-fill"></div></div><div class="fallout-progress-time"><span class="fallout-time-elapsed">00:00</span><span class="fallout-time-remaining">-00:00</span></div></div><div class="fallout-controls"><span class="fallout-ctrl fallout-ctrl-prev">&#9664;&#9664;</span><span class="fallout-ctrl fallout-ctrl-play">' + ICON_PLAY + '</span><span class="fallout-ctrl fallout-ctrl-next">&#9654;&#9654;</span></div></div></div><div class="fallout-bottom"><div class="fallout-bottom-row"><span class="fallout-tech-info">BITRATE 320 kbps, 44.1 kHz, STEREO</span><div class="fallout-spectrum">' + specHtml + '</div></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = {
            artworkImg: widget.querySelector('.fallout-artwork-img'),
            artworkNoimg: widget.querySelector('.fallout-artwork-noimg'),
            artworkCaption: widget.querySelector('.fallout-artwork-caption'),
            trackLabel: widget.querySelector('.fallout-track-label'),
            titleEl: widget.querySelector('.fallout-title'),
            artistValue: widget.querySelector('.fallout-meta-artist'),
            albumValue: widget.querySelector('.fallout-meta-album'),
            durationValue: widget.querySelector('.fallout-meta-duration'),
            progressFill: widget.querySelector('.fallout-progress-fill'),
            timeElapsed: widget.querySelector('.fallout-time-elapsed'),
            timeRemaining: widget.querySelector('.fallout-time-remaining'),
            playCtrl: widget.querySelector('.fallout-ctrl-play'),
            spectrum: widget.querySelector('.fallout-spectrum')
        };
        cachedThumb = '';
        var g = document.createElement('div');
        g.style.cssText = 'position:absolute;inset:0;z-index:52;pointer-events:none;display:none';
        widget.appendChild(g);
        E.glitchEl = g;
        var f = document.createElement('div');
        f.style.cssText = 'position:absolute;inset:0;z-index:53;pointer-events:none;display:none;background:radial-gradient(ellipse at center,rgba(0,255,0,0.25) 0%,rgba(0,255,0,0.15) 50%,rgba(0,200,0,0.05) 100%)';
        widget.appendChild(f);
        E.flashEl = f;
        if (chaosTimer) clearTimeout(chaosTimer);
        chaosFlicker();
    },
    destroy: function() {
        widget.classList.remove('fallout');
        if (styleEl) { styleEl.remove(); styleEl = null; }
        if (nodes) { nodes.forEach(function(c){if(c.parentNode)c.remove()}); nodes = null; }
        widget.style.opacity = '';
        widget.style.transform = '';
        if (E && E.glitchEl) { E.glitchEl.remove(); E.glitchEl = null; }
        if (E && E.flashEl) { E.flashEl.remove(); E.flashEl = null; }
        if (chaosTimer) clearTimeout(chaosTimer);
        chaosTimer = null;
        E = null; cachedThumb = '';
    },
    show: function(data) {
        if (!E) this.init();
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
        E.artworkCaption.textContent = (data.album || data.title || '').toUpperCase();
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
            var adj = data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
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
        var _mg = marqueeGen;
        setMarqueeText(E.titleEl, (text || '').toUpperCase(), _mg);
        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(function(){if(_mg===marqueeGen&&marqueeItems.length>0)marqueeCycle(_mg);},1200);
        E.artistValue.textContent = '';
        E.albumValue.textContent = '';
        E.artworkCaption.textContent = '';
        E.durationValue.textContent = '--:--';
        E.trackLabel.innerHTML = ICON_PLAY + ' TRACK';
        E.playCtrl.innerHTML = ICON_PLAY;
        E.progressFill.style.width = '0%';
        E.timeElapsed.textContent = '00:00';
        E.timeRemaining.textContent = '-00:00';
        E.artworkImg.classList.remove('visible');
        E.artworkNoimg.style.display = 'flex';
        E.spectrum.classList.remove('playing');
        cachedThumb = '';
        if (syncId) clearInterval(syncId);
    }
};
})();
