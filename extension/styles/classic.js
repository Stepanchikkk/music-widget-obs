(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null;

S.classic = {
    init: function() {
        widget.classList.add('classic');
        styleEl = document.createElement('style');
        styleEl.textContent = '.classic{font-family:\"Segoe UI\",Arial,sans-serif}.classic .artwork-wrap{width:28%;min-width:calc(20vh);position:relative;overflow:hidden}.v.classic .artwork-wrap{flex:none;height:50%;max-height:50%;width:100%}.classic .artwork{width:100%;height:100%;object-fit:cover;display:none}.classic .artwork.visible{display:block}.classic .artwork-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04)}.classic .artwork-bg.hidden{display:none}.classic .artwork-bg svg{width:40%;height:40%;opacity:0.15;fill:rgba(255,255,255,0.6)}.classic .track-info{display:flex;flex-direction:row;align-items:center;flex:1;min-width:0;padding:calc(1vh) calc(2.5vh) calc(1vh) calc(5vh);gap:0;overflow:hidden}.classic .track-info-text{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(0.6vh);min-width:0;overflow:hidden}.classic .controls{flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 calc(8vh)}.classic .timing{font-size:calc(12vh);white-space:nowrap}.classic .state-btn{width:calc(35vh);height:calc(35vh)}.v.classic .track-info{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;align-items:stretch;padding:calc(1.5vh) calc(3vh);gap:calc(0.3vh);overflow:hidden}.v.classic .controls{display:none}.v.classic .state-btn{width:calc(10vh);height:calc(10vh)}.v.classic .timing{font-size:calc(3vh)}.progress-wrap{position:absolute;bottom:0;left:0;right:0;height:calc(3vh);background:rgba(255,255,255,0.1);overflow:hidden}.classic .progress-wrap{border-radius:0 0 calc(12vh) calc(12vh)}.h.classic .progress-wrap{position:absolute;height:calc(6vh)}.v.classic .progress-wrap{position:relative;border-radius:0 0 calc(5vh) calc(5vh)}.classic .progress-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--accent-1,#8b5cf6),var(--accent-2,#06b6d4));transition:width 1s linear}.classic .progress-fill.paused{opacity:0.35}.classic .track-title{font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.h.classic .track-title{font-size:calc(22vh);line-height:1.25}.v.classic .track-title{font-size:calc(12vh);line-height:1.25}.classic .track-artist{font-weight:500;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.h.classic .track-artist{font-size:calc(14vh);line-height:1.25}.v.classic .track-artist{font-size:calc(7vh);line-height:1.25;margin-bottom:calc(0.5vh)}.classic .track-album{color:rgba(255,255,255,0.35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25}.h.classic .track-album{font-size:calc(14vh)}.v.classic .track-album{font-size:calc(4vh);margin-bottom:calc(0.5vh)}.classic .timing{color:rgba(255,255,255,0.5);font-variant-numeric:tabular-nums;font-weight:600;letter-spacing:0.02em;line-height:1.25;white-space:nowrap}.classic .state-btn{display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.8);border-radius:50%;background:rgba(255,255,255,0.08);flex-shrink:0}.classic .state-btn svg{width:45%;height:45%}.classic .track-title-wrap,.classic .track-artist-wrap,.classic .track-album-wrap{overflow:hidden;white-space:nowrap;position:relative}.classic .marquee-inner{display:inline-block;will-change:transform}.classic .marquee-inner.active{animation:marquee var(--marquee-duration,12s) linear 1 forwards}.classic .marquee-inner span{display:inline-block;padding-right:3em}@keyframes marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        document.head.appendChild(styleEl);
        var d = document.createElement('div');
        d.innerHTML = '<div class="artwork-wrap"><img class="artwork" alt="" ><div class="artwork-bg"><svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg></div></div><div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div><div class="track-album-wrap"><div class="track-album"><div class="marquee-inner"></div></div></div><div class="timing"></div></div><div class="controls"><div class="state-btn"></div></div></div><div class="progress-wrap"><div class="progress-fill"></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: widget.querySelector('.classic .artwork'), artworkBg: widget.querySelector('.classic .artwork-bg'), titleEl: widget.querySelector('.classic .track-title .marquee-inner'), artistEl: widget.querySelector('.classic .track-artist .marquee-inner'), albumEl: widget.querySelector('.classic .track-album .marquee-inner'), timingEl: widget.querySelector('.classic .timing'), stateBtn: widget.querySelector('.classic .state-btn'), progressFill: widget.querySelector('.classic .progress-fill') };
    },
    destroy: function() {
        widget.classList.remove('classic');
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
                if (E.artwork.complete && E.artwork.naturalWidth > 0) {
                    E.artwork.classList.add('visible'); E.artworkBg.classList.add('hidden');
                    try{var c=colors(E.artwork);applyColors(c.dark,c.light,'classic');}catch(e){}
                } else {
                    E.artwork.onload = function(){E.artwork.classList.add('visible');E.artworkBg.classList.add('hidden');try{var c=colors(E.artwork);applyColors(c.dark,c.light,'classic');}catch(e){}};
                    E.artwork.onerror = function(){E.artwork.classList.remove('visible');E.artworkBg.classList.remove('hidden');resetColors('classic');};
                }
            }
        } else {
            E.artwork.classList.remove('visible'); E.artworkBg.classList.remove('hidden');
            resetColors('classic');
        }
        E.stateBtn.innerHTML = data.state === 'paused' ? SVG_PLAY : SVG_PAUSE;
        E.progressFill.className = 'progress-fill' + (data.state === 'paused' ? ' paused' : '');
        if (syncId) clearInterval(syncId);
        if (data.duration > 0) {
            var adj = data.state === 'paused' ? data.currentTime : data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
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
        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
        resetColors('classic');
    }
};
})();
