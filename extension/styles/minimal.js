(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null;

S.minimal = {
    init: function() {
        widget.classList.add('minimal');
        styleEl = document.createElement('style');
        styleEl.textContent = '.minimal{background:transparent!important;border:none!important;box-shadow:none!important;font-family:\"Segoe UI\",Arial,sans-serif}.minimal .artwork-wrap{display:none!important}.minimal .track-album-wrap{display:none!important}.minimal .timing{display:none!important}.minimal .controls{display:none!important}.minimal .progress-wrap{display:none!important}.minimal .track-info{display:flex;flex:1}.minimal .track-info-text{flex:1;display:flex;flex-direction:column;justify-content:space-between;padding:0 calc(4vh) 2vh calc(4vh)}.minimal .track-title-wrap,.minimal .track-artist-wrap{white-space:nowrap;position:relative}.minimal .track-title{font-size:calc(50vh);line-height:1.2;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.minimal .track-artist{font-size:calc(33vh);line-height:1.2;font-weight:500;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.minimal .marquee-inner{display:inline-block;will-change:transform}.minimal .marquee-inner.active{animation:marquee var(--marquee-duration,12s) linear 1 forwards}.minimal .marquee-inner span{display:inline-block;padding-right:3em}@keyframes marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        document.head.appendChild(styleEl);
        var d = document.createElement('div');
        d.innerHTML = '<div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: null, artworkBg: null, titleEl: widget.querySelector('.minimal .track-title .marquee-inner'), artistEl: widget.querySelector('.minimal .track-artist .marquee-inner'), albumEl: null, timingEl: null, stateBtn: null, progressFill: null };
    },
    destroy: function() {
        widget.classList.remove('minimal');
        if (styleEl) { styleEl.remove(); styleEl = null; }
        if (nodes) { nodes.forEach(function(c){if(c.parentNode)c.remove()}); nodes = null; }
        E = null;
    },
    show: function(data) {
        if (!E) this.init();
        var newKey = (data.title||'') + '|' + (data.artist||'');
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
    },
    showStatus: function(text) {
        if (!E) return;
        E.titleEl.textContent = text || '';
        E.artistEl.textContent = '';
        resetColors('minimal');
    }
};
})();
