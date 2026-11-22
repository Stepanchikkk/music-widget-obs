(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var DEFAULT_COVER = BASE + '../default-cover.webp';
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = BASE + 'style.css';
link.addEventListener('load', function () { if (E && lastTitle !== null) layout(lastTitle); });
document.head.appendChild(link);

var S = window.__STYLES = window.__STYLES || {};
var E = null;
var lastTitle = null;
var lastArtist = null;
var resizeTimer = null;
var lastData = null;

function textWidth(el) {
  var r = document.createRange();
  r.selectNodeContents(el);
  return r.getBoundingClientRect().width;
}

function measure(text) {
  E.title.classList.remove('active');
  E.title.style.animation = '';
  E.title.innerHTML = '<span>' + (text || '') + '</span>';
  return textWidth(E.title);
}

function layout(title) {
  if (!E) return;
  sizePanel();
  var tw = measure(title);
  var cw = E.body.clientWidth;
  marqueeGen++;
  cleanupMq();
  if (tw > cw + 2 && cw > 0) {
    E.title.innerHTML = '<span>' + (title || '') + '</span><span>' + (title || '') + '</span>';
    var fs2 = parseFloat(getComputedStyle(E.title).fontSize) || 16;
    var distance = tw + fs2 * 3;
    var dur = Math.max(8000, (distance / 55) * 1000);
    E.title.style.setProperty('--marquee-duration', (dur / 1000).toFixed(1) + 's');
    var gen = marqueeGen;
    marqueeItems.push({ el: E.title, text: title || '', dur: dur });
    marqueeTimer = setTimeout(function () {
      if (gen === marqueeGen && marqueeItems.length > 0) marqueeCycle(gen);
    }, 1200);
  } else {
    E.title.innerHTML = '<span>' + (title || '') + '</span>';
    E.title.style.animation = '';
  }
}

function sizePanel() {
  if (!E || !E.art || !E.panel) return;
  if (widget.classList.contains('v')) { E.panel.style.width = ''; return; }
  var cs = getComputedStyle(E.wrap);
  var pad = parseFloat(cs.paddingLeft) || 0;
  var wrapW = E.wrap.getBoundingClientRect().width;
  var overlap = Math.abs(parseFloat(getComputedStyle(E.panel).marginLeft) || 0);
  var avail = wrapW - pad * 2 - E.art.offsetWidth + overlap;
  var target = E.art.offsetWidth * 2.67;
  E.panel.style.width = Math.round(Math.max(60, Math.min(target, avail))) + 'px';
}

function fitTitle(text, artist) {
  if (text === lastTitle && artist === lastArtist) return;
  lastTitle = text;
  lastArtist = artist;
  layout(text);
  sizePanel();
}

S.blur = {
  init: function() {
    if (E) return;
    widget.classList.add('blur');
    var wrap = document.createElement('div');
    wrap.className = 'bl-wrap';
    wrap.innerHTML = '<div class="bl-wrap"><div class="bl-art"><img class="bl-img" alt=""></div><div class="bl-panel"><img class="bl-bg" alt=""><div class="bl-scrim"></div>' +
      '<div class="bl-body"><div class="bl-title-wrap"><div class="bl-title"></div></div><div class="bl-artist"></div></div></div></div>';
    widget.appendChild(wrap);
    E = {
      wrap: wrap,
      art: wrap.querySelector('.bl-art'),
      panel: wrap.querySelector('.bl-panel'),
      bg: wrap.querySelector('.bl-bg'),
      body: wrap.querySelector('.bl-body'),
      img: wrap.querySelector('.bl-img'),
      title: wrap.querySelector('.bl-title'),
      artist: wrap.querySelector('.bl-artist'),
    };
    E.img.onerror = function () {
      if (E.img.src.indexOf('default-cover') === -1) { E.img.src = DEFAULT_COVER; E.bg.src = DEFAULT_COVER; }
    };
    E.bg.onerror = function () {
      if (E.bg.src.indexOf('default-cover') === -1) E.bg.src = DEFAULT_COVER;
    };
    lastTitle = null;
    lastArtist = null;
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    if (!window.__blurResizeBound) {
      window.__blurResizeBound = true;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (!E || !lastData) return;
          lastTitle = null;
          sizePanel();
          fitTitle(lastData.title || '', lastData.artist || '');
        }, 150);
      });
    }
  },
  destroy: function() {
    widget.classList.remove('blur', 'playing');
    if (E && E.wrap && E.wrap.parentNode) E.wrap.remove();
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    marqueeGen++;
    cleanupMq();
    E = null;
    lastTitle = null;
    lastArtist = null;
  },
  show: function(data) {
    if (!E) this.init();
    lastData = data;
    fitTitle(data.title || '', data.artist || '');
    E.artist.textContent = data.artist || '';
    if (data.thumbnail) {
      E.img.src = data.thumbnail;
      E.bg.src = data.thumbnail;
      E.bg.classList.add('on');
      E.img.classList.add('on');
    } else {
      E.img.src = DEFAULT_COVER;
      E.img.classList.add('on');
      E.bg.src = DEFAULT_COVER;
      E.bg.classList.add('on');
    }
    widget.classList.toggle('playing', data.state !== 'paused');
  },
  showStatus: function(text) {
    if (!E) this.init();
    widget.classList.remove('playing');
    lastTitle = null;
    marqueeGen++;
    cleanupMq();
    E.title.classList.remove('active');
    E.title.innerHTML = '<span class="bl-status">' + (text || '') + '</span>';
    E.artist.textContent = '';
    E.img.src = DEFAULT_COVER;
    E.img.classList.add('on');
    E.bg.src = DEFAULT_COVER;
    E.bg.classList.add('on');
  }
};
})();
