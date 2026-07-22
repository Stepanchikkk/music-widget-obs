(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null;

S.glass = {
    init: function() {
        widget.classList.add('glass');
        styleEl = document.createElement('style');
        styleEl.textContent = '.glass{background:transparent!important;font-family:\"Segoe UI\",Arial,sans-serif;border:3px solid rgba(220,235,255,0.25);box-shadow:0 10px 40px rgba(0,0,0,0.35),inset 0 2px 0 rgba(180,220,255,0.45),inset 0 -2px 0 rgba(200,170,130,0.2),inset 2px 0 0 rgba(180,210,250,0.08),inset -2px 0 0 rgba(220,190,160,0.06);text-shadow:0 2px 16px rgba(0,0,0,0.8);overflow:hidden}.glass::before{content:\'\';position:absolute;inset:0;z-index:0;border-radius:inherit;background:var(--glass-artwork,none)center/cover no-repeat;filter:blur(40px)brightness(0.35)saturate(1.3);pointer-events:none}.glass::after{content:\'\';position:absolute;inset:0;z-index:1;border-radius:inherit;background:linear-gradient(160deg,rgba(200,220,250,0.5)0%,rgba(180,200,235,0.35)35%,rgba(160,180,215,0.25)65%,rgba(140,160,200,0.4)100%);pointer-events:none}.glass .artwork-wrap{width:28%;min-width:calc(20vh);position:relative;overflow:hidden}.v.glass .artwork-wrap{flex:none;height:50%;max-height:50%;width:100%}.glass .artwork{width:100%;height:100%;object-fit:cover;display:none}.glass .artwork.visible{display:block}.glass .artwork-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04)}.glass .artwork-bg.hidden{display:none}.glass .artwork-bg svg{width:40%;height:40%;opacity:0.15;fill:rgba(255,255,255,0.6)}.glass .track-info{position:relative;z-index:2;display:flex;flex-direction:row;align-items:center;flex:1;min-width:0;padding:calc(1vh) calc(2.5vh) calc(1vh) calc(5vh);gap:0;overflow:hidden}.glass .track-info-text{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(0.6vh);min-width:0;overflow:hidden}.glass .controls{position:relative;z-index:2;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 calc(8vh)}.glass .timing{font-size:calc(12vh);white-space:nowrap;color:rgba(255,255,255,0.45)}.glass .state-btn{width:calc(35vh);height:calc(35vh);background:rgba(255,255,255,0.15)}.glass .state-btn:hover{background:rgba(255,255,255,0.25)}.v.glass .track-info{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;align-items:stretch;padding:calc(1.5vh) calc(3vh);gap:calc(0.3vh);overflow:hidden}.v.glass .controls{display:none}.v.glass .state-btn{width:calc(10vh);height:calc(10vh)}.v.glass .timing{font-size:calc(3vh)}.glass .progress-wrap{position:absolute;bottom:0;left:0;right:0;height:calc(3vh);background:rgba(255,255,255,0.1);overflow:hidden;border-radius:0 0 calc(12vh) calc(12vh);z-index:2}.h.glass .progress-wrap{height:calc(6vh)}.v.glass .progress-wrap{position:relative;border-radius:0 0 calc(5vh) calc(5vh)}.glass .progress-fill{height:100%;width:0%;background:rgba(255,255,255,0.35);transition:width 1s linear}.glass .progress-fill.paused{opacity:0.35}.glass .track-title{font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.h.glass .track-title{font-size:calc(22vh);line-height:1.25}.v.glass .track-title{font-size:calc(12vh);line-height:1.25}.glass .track-artist{font-weight:500;color:rgba(255,255,255,0.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.h.glass .track-artist{font-size:calc(14vh);line-height:1.25}.v.glass .track-artist{font-size:calc(7vh);line-height:1.25;margin-bottom:calc(0.5vh)}.glass .track-album{color:rgba(255,255,255,0.3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25}.h.glass .track-album{font-size:calc(14vh)}.v.glass .track-album{font-size:calc(4vh);margin-bottom:calc(0.5vh)}.glass .timing{font-variant-numeric:tabular-nums;font-weight:600;letter-spacing:0.02em;line-height:1.25;white-space:nowrap}.glass .state-btn{display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.8);border-radius:50%;flex-shrink:0}.glass .state-btn svg{width:45%;height:45%}.glass .track-title-wrap,.glass .track-artist-wrap,.glass .track-album-wrap{overflow:hidden;white-space:nowrap;position:relative}.glass .marquee-inner{display:inline-block;will-change:transform}.glass .marquee-inner.active{animation:marquee var(--marquee-duration,12s) linear 1 forwards}.glass .marquee-inner span{display:inline-block;padding-right:3em}@keyframes marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        document.head.appendChild(styleEl);
        var d = document.createElement('div');
        d.innerHTML = '<div class="artwork-wrap"><img class="artwork" alt="" crossorigin="anonymous"><div class="artwork-bg"><svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg></div></div><div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div><div class="track-album-wrap"><div class="track-album"><div class="marquee-inner"></div></div></div><div class="timing"></div></div><div class="controls"><div class="state-btn"></div></div></div><div class="progress-wrap"><div class="progress-fill"></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: widget.querySelector('.glass .artwork'), artworkBg: widget.querySelector('.glass .artwork-bg'), titleEl: widget.querySelector('.glass .track-title .marquee-inner'), artistEl: widget.querySelector('.glass .track-artist .marquee-inner'), albumEl: widget.querySelector('.glass .track-album .marquee-inner'), timingEl: widget.querySelector('.glass .timing'), stateBtn: widget.querySelector('.glass .state-btn'), progressFill: widget.querySelector('.glass .progress-fill') };
    },
    destroy: function() {
        widget.classList.remove('glass');
        widget.style.removeProperty('--glass-artwork');
        if (styleEl) { styleEl.remove(); styleEl = null; }
        if (nodes) { nodes.forEach(function(c){if(c.parentNode)c.remove()}); nodes = null; }
        E = null;
    },
    show: function(data) {
        if (!E) this.init();
        var newKey = (data.title||'') + '|' + (data.artist||'') + '|' + (data.thumbnail||'');
        var isNew = newKey !== showTrackKey;
        if (isNew) showTrackKey = newKey;
        if (isNew) {
            marqueeGen++; cleanupMq();
            var gen = marqueeGen;
            setMarqueeText(E.titleEl, data.title || '', gen);
            setMarqueeText(E.artistEl, data.artist || '', gen);
            setMarqueeText(E.albumEl, data.album || '', gen);
            clearTimeout(marqueeTimer);
            marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
        }
        if (data.thumbnail) {
            var s = E.artwork.getAttribute('src');
            if (s !== data.thumbnail || !E.artwork.classList.contains('visible')) {
                E.artwork.src = data.thumbnail;
                widget.style.setProperty('--glass-artwork', 'url(' + data.thumbnail + ')');
                if (E.artwork.complete && E.artwork.naturalWidth > 0) {
                    E.artwork.classList.add('visible'); E.artworkBg.classList.add('hidden');
                } else {
                    E.artwork.onload = function(){E.artwork.classList.add('visible');E.artworkBg.classList.add('hidden');};
                    E.artwork.onerror = function(){E.artwork.classList.remove('visible');E.artworkBg.classList.remove('hidden');};
                }
            }
        } else {
            E.artwork.classList.remove('visible'); E.artworkBg.classList.remove('hidden');
            widget.style.removeProperty('--glass-artwork');
        }
        E.stateBtn.innerHTML = data.state === 'paused' ? SVG_PLAY : SVG_PAUSE;
        E.progressFill.className = 'progress-fill' + (data.state === 'paused' ? ' paused' : '');
        if (syncId) clearInterval(syncId);
        if (data.duration > 0) {
            var adj = data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
            E.timingEl.textContent = fmt(adj) + ' / ' + fmt(data.duration);
            E.progressFill.style.width = Math.min(adj/data.duration*100, 100) + '%';
            if (data.state !== 'paused') tick(adj, data.duration, E.timingEl, E.progressFill);
        } else { E.timingEl.textContent = ''; E.progressFill.style.width = '0%'; }
    },
    showStatus: function(text) {
        if (!E) return;
        var gen = marqueeGen;
        setMarqueeText(E.titleEl, text || '', gen);
        E.artistEl.textContent = ''; E.albumEl.textContent = '';
        E.timingEl.textContent = ''; E.stateBtn.innerHTML = ''; E.progressFill.style.width = '0%';
        E.progressFill.className = 'progress-fill';
        E.artwork.classList.remove('visible'); E.artworkBg.classList.remove('hidden');
        widget.style.removeProperty('--glass-artwork');
        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
        resetColors('glass');
    }
};
})();
