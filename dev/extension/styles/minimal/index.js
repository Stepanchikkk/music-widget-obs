(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var link = document.createElement('link'); link.rel = 'stylesheet'; link.href = BASE + 'style.css'; document.head.appendChild(link);
var S = window.__STYLES = window.__STYLES || {};
var E = null, nodes = null;

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
        var d = document.createElement('div');
        d.innerHTML = '<div class="track-info"><div class="track-info-text"><div class="track-title-wrap"><div class="track-title"><div class="marquee-inner"></div></div></div><div class="track-artist-wrap"><div class="track-artist"><div class="marquee-inner"></div></div></div></div></div>';
        nodes = [];
        while (d.firstChild) { nodes.push(d.firstChild); widget.appendChild(d.firstChild); }
        E = { artwork: null, artworkBg: null, titleEl: widget.querySelector('.minimal .track-title .marquee-inner'), artistEl: widget.querySelector('.minimal .track-artist .marquee-inner'), albumEl: null, timingEl: null, stateBtn: null, progressFill: null };
    },
    destroy: function() {
        widget.classList.remove('minimal', 'minimal-status');
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
