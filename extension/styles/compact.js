(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null;

S.compact = {
    init: function() {
        widget.classList.add('compact');
        styleEl = document.createElement('style');
        styleEl.textContent = '.compact{font-family:\"Segoe UI\",Arial,sans-serif}.compact .artwork-wrap{width:28%;min-width:calc(20vh);position:relative;overflow:hidden}.v.compact .artwork-wrap{flex:none;height:50%;max-height:50%;width:100%}.compact .artwork{width:100%;height:100%;object-fit:cover;display:none}.compact .artwork.visible{display:block}.compact .artwork-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04)}.compact .artwork-bg.hidden{display:none}.compact .artwork-bg svg{width:40%;height:40%;opacity:0.15;fill:rgba(255,255,255,0.6)}.compact .track-info{display:flex;flex-direction:row;align-items:center;flex:1;min-width:0;padding:calc(1vh) calc(2.5vh) calc(1vh) calc(5vh);gap:0;overflow:hidden}.compact .track-info-text{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(0.6vh);min-width:0;overflow:hidden}.compact .controls{flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 calc(8vh)}.compact .timing{display:none}.compact .track-album-wrap{display:none}.h.compact .track-title{font-size:calc(40vh);line-height:1.25}.h.compact .track-artist{font-size:calc(26vh);line-height:1.25}.v.compact .track-title{font-size:calc(28vh);line-height:1.25}.v.compact .track-artist{font-size:calc(20vh);line-height:1.3}.h.compact .state-btn{width:calc(38vh);height:calc(38vh)}.v.compact .state-btn{width:calc(30vh);height:calc(30vh)}.v.compact .track-info{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;align-items:stretch;padding:calc(1.5vh) calc(3vh);gap:calc(0.3vh);overflow:hidden}.v.compact .controls{display:none}.progress-wrap{position:absolute;bottom:0;left:0;right:0;height:calc(3vh);background:rgba(255,255,255,0.1);overflow:hidden}.compact .progress-wrap{border-radius:0 0 calc(12vh) calc(12vh)}.h.compact .progress-wrap{position:absolute;height:calc(6vh)}.v.compact .progress-wrap{position:relative;border-radius:0 0 calc(5vh) calc(5vh)}.compact .progress-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--accent-1,#8b5cf6),var(--accent-2,#06b6d4));transition:width 1s linear}.compact .progress-fill.paused{opacity:0.35}.compact .track-title{font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.compact .track-artist{font-weight:500;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.compact .track-title-wrap,.compact .track-artist-wrap{overflow:hidden;white-space:nowrap;position:relative}.compact .marquee-inner{display:inline-block;will-change:transform}.compact .marquee-inner.active{animation:marquee var(--marquee-duration,12s) linear 1 forwards}.compact .marquee-inner span{display:inline-block;padding-right:3em}.compact .state-btn{display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.8);border-radius:50%;background:rgba(255,255,255,0.08);flex-shrink:0}.compact .state-btn svg{width:45%;height:45%}@keyframes marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        document.head.appendChild(styleEl);
        var d = document.createElement('div');
        d.innerHTML = '<div class="artwork-wrap"><img class="artwork" alt="" crossorigin="anonymous"><div class="artwork-bg"><svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg></div></div><div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div><div class="track-album-wrap"><div class="track-album"><div class="marquee-inner"></div></div></div><div class="timing"></div></div><div class="controls"><div class="state-btn"></div></div></div><div class="progress-wrap"><div class="progress-fill"></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: widget.querySelector('.compact .artwork'), artworkBg: widget.querySelector('.compact .artwork-bg'), titleEl: widget.querySelector('.compact .track-title .marquee-inner'), artistEl: widget.querySelector('.compact .track-artist .marquee-inner'), albumEl: widget.querySelector('.compact .track-album .marquee-inner'), timingEl: widget.querySelector('.compact .timing'), stateBtn: widget.querySelector('.compact .state-btn'), progressFill: widget.querySelector('.compact .progress-fill') };
    },
    destroy: function() {
        widget.classList.remove('compact');
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
            clearTimeout(marqueeTimer);
            marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
            if (data.thumbnail) {
                E.artwork.src = data.thumbnail;
                if (E.artwork.complete && E.artwork.naturalWidth > 0) {
                    E.artwork.classList.add('visible'); E.artworkBg.classList.add('hidden');
                    try{var c=colors(E.artwork);applyColors(c.dark,c.light,'compact');}catch(e){}
                } else {
                    E.artwork.onload = function(){E.artwork.classList.add('visible');E.artworkBg.classList.add('hidden');try{var c=colors(E.artwork);applyColors(c.dark,c.light,'compact');}catch(e){}};
                    E.artwork.onerror = function(){E.artwork.classList.remove('visible');E.artworkBg.classList.remove('hidden');resetColors('compact');};
                }
            } else {
                E.artwork.classList.remove('visible'); E.artworkBg.classList.remove('hidden');
                resetColors('compact');
            }
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
        clearTimeout(marqueeTimer);
        marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
        resetColors('compact');
    }
};
})();
