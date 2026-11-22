(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var link = document.createElement('link'); link.rel = 'stylesheet'; link.href = BASE + 'style.css'; document.head.appendChild(link);
var S = window.__STYLES = window.__STYLES || {};
var E = null, nodes = null;

S.compact = {
    init: function() {
        widget.classList.add('compact');
                var d = document.createElement('div');
        d.innerHTML = '<div class="artwork-wrap"><img class="artwork" alt="" crossorigin="anonymous"><div class="artwork-bg"><svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg></div></div><div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div><div class="track-album-wrap"><div class="track-album"><div class="marquee-inner"></div></div></div><div class="timing"></div></div><div class="controls"><div class="state-btn"></div></div></div><div class="progress-wrap"><div class="progress-fill"></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: widget.querySelector('.compact .artwork'), artworkBg: widget.querySelector('.compact .artwork-bg'), titleEl: widget.querySelector('.compact .track-title .marquee-inner'), artistEl: widget.querySelector('.compact .track-artist .marquee-inner'), albumEl: widget.querySelector('.compact .track-album .marquee-inner'), timingEl: widget.querySelector('.compact .timing'), stateBtn: widget.querySelector('.compact .state-btn'), progressFill: widget.querySelector('.compact .progress-fill') };
    },
    destroy: function() {
        widget.classList.remove('compact');
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
        }
        if (data.thumbnail) {
            var s = E.artwork.getAttribute('src');
            if (s !== data.thumbnail || !E.artwork.classList.contains('visible')) {
                E.artwork.src = data.thumbnail;
                if (E.artwork.complete && E.artwork.naturalWidth > 0) {
                    E.artwork.classList.add('visible'); E.artworkBg.classList.add('hidden');
                    try{var c=colors(E.artwork);applyColors(c.dark,c.light,'compact');}catch(e){}
                } else {
                    E.artwork.onload = function(){E.artwork.classList.add('visible');E.artworkBg.classList.add('hidden');try{var c=colors(E.artwork);applyColors(c.dark,c.light,'compact');}catch(e){}};
                    E.artwork.onerror = function(){E.artwork.classList.remove('visible');E.artworkBg.classList.remove('hidden');resetColors('compact');};
                }
            }
        } else {
            E.artwork.classList.remove('visible'); E.artworkBg.classList.remove('hidden');
            resetColors('compact');
        }
        if (E.stateBtn.getAttribute('data-state') !== data.state) {
            E.stateBtn.setAttribute('data-state', data.state);
            E.stateBtn.innerHTML = data.state === 'paused' ? SVG_PLAY : SVG_PAUSE;
        }
        var pc = 'progress-fill' + (data.state === 'paused' ? ' paused' : '');
        if (E.progressFill.className !== pc) E.progressFill.className = pc;
        if (syncId) clearInterval(syncId);
        if (data.duration > 0) {
            var adj = data.state === 'paused' ? data.currentTime : data.currentTime + (Date.now() - (data.ts||Date.now())) / 1000;
            E.timingEl.textContent = fmt(adj) + ' / ' + fmt(data.duration);
            E.progressFill.style.width = Math.min(adj/data.duration*100, 100) + '%';
            if (data.state !== 'paused') tick(adj, data.duration, E.timingEl, E.progressFill);
        } else { E.timingEl.textContent = data.currentTime > 0 ? fmt(data.currentTime) : ''; E.progressFill.style.width = '0%'; }
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
