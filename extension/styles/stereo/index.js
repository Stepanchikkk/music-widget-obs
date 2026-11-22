(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var link = document.createElement('link'); link.rel = 'stylesheet'; link.href = BASE + 'style.css'; document.head.appendChild(link);
var S = window.__STYLES = window.__STYLES || {};
var display = null, resizeHandler = null, rAF = null;
var IMG_W = 1448, IMG_H = 482;
var DX = 316, DY = 185, DW = 1362 - 323, DH = 312 - 185;

var buf = '', pos = 0, MAX_VIS = 22, maxPos = 0, lastText = '';
var tid = null;

function reposition() {
    if (!display) return;
    var w = widget.offsetWidth, h = widget.offsetHeight;
    if (!w || !h) return;
    var s = Math.min(w / IMG_W, h / IMG_H);
    var ox = (w - IMG_W * s) / 2, oy = (h - IMG_H * s) / 2;
    display.style.left   = (ox + DX * s) + 'px';
    display.style.top    = (oy + DY * s) + 'px';
    display.style.width  = (DW * s) + 'px';
    display.style.height = (DH * s) + 'px';
    display.style.fontSize = Math.max(8, DH * s * 0.835) + 'px';
}

function segRender() {
    if (!display) return;
    var cw = display.clientWidth;
    display.textContent = buf.substring(pos, pos + MAX_VIS);
    while (display.scrollWidth > cw && display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function segStop() {
    if (tid) { clearTimeout(tid); tid = null; }
}

function segTick() {
    pos++;
    if (pos >= maxPos) {
        pos = 0;
        segRender();
        segStop();
        tid = setTimeout(function() { pos = 0; segRender(); tid = setTimeout(segTick, 300); }, 3000);
        return;
    }
    segRender();
    tid = setTimeout(segTick, 300);
}

function segShow(text) {
    var trimmed = (text || '').trim();
    if (trimmed === lastText) return;
    lastText = trimmed;
    segStop();
    var needsScroll = false;
    if (display) {
        display.textContent = trimmed;
        needsScroll = display.scrollWidth > display.clientWidth;
    }
    if (needsScroll) {
        var gap = '';
        for (var i = 0; i < 16; i++) { gap += ' '; }
        buf = trimmed + gap + trimmed;
        maxPos = trimmed.length + gap.length;
    } else {
        buf = trimmed;
        maxPos = trimmed.length;
    }
    pos = 0;
    segRender();
    if (needsScroll) tid = setTimeout(segTick, 3000);
}

S.stereo = {
    init: function() {
        widget.classList.add('stereo');
        display = document.createElement('div');
        display.className = 'stereo-display';
        widget.appendChild(display);
        reposition();
        resizeHandler = function() {
            cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(reposition);
        };
        window.addEventListener('resize', resizeHandler);
    },
    destroy: function() {
        segStop();
        lastText = '';
        widget.classList.remove('stereo');
        if (display) { display.remove(); display = null; }
        if (resizeHandler) { window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
        if (rAF) { cancelAnimationFrame(rAF); rAF = null; }
    },
    show: function(data) {
        reposition();
        segShow(((data.title || '') + ' - ' + (data.artist || '')).toUpperCase());
    },
    showStatus: function(text) {
        reposition();
        segShow((text || '').toUpperCase());
    }
};
})();
