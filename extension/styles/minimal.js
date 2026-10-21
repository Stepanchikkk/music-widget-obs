(function(){
var S = window.__STYLES = window.__STYLES || {};
var E = null, styleEl = null, nodes = null;

function setupMarquee(el, text, gen) {
    if (!text) { el.innerHTML = ''; el.classList.remove('active'); el.style.transform = ''; return; }
    el.style.transform = '';
    el.classList.remove('active');
    el.innerHTML = '<span>' + text + '</span>';
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            if (gen !== undefined && gen !== marqueeGen) return;
            var wrap = el.closest('.track-title-wrap, .track-artist-wrap, .track-album-wrap');
            if (!wrap) return;
            var cw = wrap.clientWidth;
            var span = el.querySelector('span');
            if (!span) return;
            var tw = span.getBoundingClientRect().width;
            var pr = parseFloat(getComputedStyle(span).paddingRight) || 0;
            if (tw - pr > cw + 2) {
                el.innerHTML = '<span>' + text + '</span><span>' + text + '</span>';
                span = el.querySelector('span');
                tw = span.getBoundingClientRect().width;
                var chars = Math.max(1, Array.from(text).length);
                var textW = Math.max(1, tw - pr);
                var gap = cw;
                var spans = el.querySelectorAll('span');
                for (var k = 0; k < spans.length; k++) spans[k].style.paddingRight = gap + 'px';
                var speedPx = (textW / chars) * marqueeCps();
                var dur = Math.max(1000, ((textW + gap) / speedPx) * 1000);
                el.style.setProperty('--marquee-duration', (dur / 1000) + 's');
                for (var i = 0; i < marqueeItems.length; i++) {
                    if (marqueeItems[i].el === el) { marqueeItems[i].text = text; marqueeItems[i].dur = dur; return; }
                }
                marqueeItems.push({ el: el, text: text, dur: dur });
            } else {
                for (var i = 0; i < marqueeItems.length; i++) {
                    if (marqueeItems[i].el === el) { marqueeItems.splice(i, 1); break; }
                }
            }
        });
    });
}

function fitStatusText(text) {
    E.titleEl.classList.remove('active');
    E.titleEl.style.transform = '';
    E.titleEl.innerHTML = text ? '<span>' + text + '</span>' : '';
    var title = widget.querySelector('.minimal .track-title');
    var wrap = widget.querySelector('.minimal .track-title-wrap');
    if (!title || !wrap) return;
    title.style.fontSize = '10vh';
    var span = E.titleEl.querySelector('span');
    if (!text || !span) return;
    var avail = wrap.clientWidth;
    var w = span.getBoundingClientRect().width;
    var pr = parseFloat(getComputedStyle(span).paddingRight) || 0;
    w = Math.max(1, w - pr);
    if (avail > 0 && w > 0) {
        var size = 10 * (avail - 4) / w;
        size = Math.max(3, Math.min(size, 80));
        title.style.fontSize = size.toFixed(2) + 'vh';
    }
}

S.minimal = {
    init: function() {
        widget.classList.remove('minimal-status');
        widget.classList.add('minimal');
        styleEl = document.createElement('style');
        styleEl.textContent = '.minimal{background:transparent!important;border:none!important;box-shadow:none!important;font-family:\"Segoe UI\",Arial,sans-serif}.minimal .artwork-wrap{display:none!important}.minimal .track-album-wrap{display:none!important}.minimal .timing{display:none!important}.minimal .controls{display:none!important}.minimal .progress-wrap{display:none!important}.minimal .track-info{display:flex;flex:1;min-width:0}.minimal .track-info-text{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;padding:0 calc(4vh);overflow:hidden}.minimal .track-title-wrap,.minimal .track-artist-wrap{min-width:0;max-width:100%;white-space:nowrap;position:relative}.minimal .track-title{font-size:calc(50vh);line-height:1.2;font-weight:700;color:#fff;white-space:nowrap}.minimal .track-artist{font-size:calc(33vh);line-height:1.2;font-weight:500;color:rgba(255,255,255,0.7);white-space:nowrap}.minimal .marquee-inner{display:inline-block;will-change:transform}.minimal .marquee-inner.active{animation:marquee var(--marquee-duration,12s) linear 1 forwards}.minimal .marquee-inner span{display:inline-block;padding-right:3em}.minimal.minimal-status .track-artist-wrap{display:none!important}.minimal.minimal-status .track-title{text-align:center}.minimal.minimal-status .track-info-text{padding:0}.minimal.minimal-status .marquee-inner span{padding-right:0}@keyframes marquee{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}';
        document.head.appendChild(styleEl);
        var d = document.createElement('div');
        d.innerHTML = '<div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: null, artworkBg: null, titleEl: widget.querySelector('.minimal .track-title .marquee-inner'), artistEl: widget.querySelector('.minimal .track-artist .marquee-inner'), albumEl: null, timingEl: null, stateBtn: null, progressFill: null };
    },
    destroy: function() {
        widget.classList.remove('minimal', 'minimal-status');
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
            widget.classList.remove('minimal-status');
            var title = widget.querySelector('.minimal .track-title');
            if (title) title.style.fontSize = '';
            marqueeGen++; cleanupMq();
            var gen = marqueeGen;
            setupMarquee(E.titleEl, data.title || '', gen);
            setupMarquee(E.artistEl, data.artist || '', gen);
            clearTimeout(marqueeTimer);
            marqueeTimer = setTimeout(function(){if(gen===marqueeGen&&marqueeItems.length>0)marqueeCycle(gen);},1200);
        }
    },
    showStatus: function(text) {
        if (!E) return;
        widget.classList.add('minimal-status');
        marqueeGen++; cleanupMq();
        fitStatusText(text || '');
        E.artistEl.innerHTML = '';
        resetColors('minimal');
    }
};
})();
