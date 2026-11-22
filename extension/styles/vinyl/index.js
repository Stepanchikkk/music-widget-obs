(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var DEFAULT_COVER = BASE + '../default-cover.webp';
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = BASE + 'style.css';
link.addEventListener('load', function () { if (E && lastTitle !== null) layout(lastTitle, lastArtist || ''); });
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
  E.title.classList.remove('run');
  E.title.style.animation = '';
  E.title.innerHTML = '<span>' + (text || '') + '</span>';
  return textWidth(E.title);
}

function layout(title) {
  if (!E) return;
  var tw = measure(title);
  var cw = E.body.clientWidth;
  marqueeGen++;
  cleanupMq();
  if (tw > cw + 2 && cw > 0) {
    E.title.innerHTML = '<span>' + (title || '') + '</span><span>' + (title || '') + '</span>';
    var fs = parseFloat(getComputedStyle(E.title).fontSize) || 16;
    var distance = tw + fs * 3;
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

function fitTitle(text, artist) {
  if (text === lastTitle && artist === lastArtist) return;
  lastTitle = text;
  lastArtist = artist;
  layout(text, artist);
}

S.vinyl = {
  init: function() {
    if (E) return;
    widget.classList.add('vinyl');
    var wrap = document.createElement('div');
    wrap.className = 'vn-wrap';
    wrap.innerHTML = '<div class="vn-disc"><div class="vn-rotor"><img class="vn-label" alt=""><div class="vn-hole"></div></div><div class="vn-glare"></div></div>' +
      '<div class="vn-body"><div class="vn-title-wrap"><div class="vn-title"></div></div><div class="vn-artist"></div><div class="vn-bar"><div class="vn-fill"></div></div></div>';
    widget.appendChild(wrap);
    E = {
      wrap: wrap,
      disc: wrap.querySelector('.vn-disc'),
      body: wrap.querySelector('.vn-body'),
      label: wrap.querySelector('.vn-label'),
      title: wrap.querySelector('.vn-title'),
      artist: wrap.querySelector('.vn-artist'),
      fill: wrap.querySelector('.vn-fill')
    };
    E.label.onerror = function () {
      if (E.label.src.indexOf('default-cover') === -1) E.label.src = DEFAULT_COVER;
    };
    lastTitle = null;
    lastArtist = null;
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    if (!window.__vinylResizeBound) {
      window.__vinylResizeBound = true;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (!E || !lastData) return;
          lastTitle = null;
          fitTitle(lastData.title || '', lastData.artist || '');
        }, 150);
      });
    }
  },
  destroy: function() {
    widget.classList.remove('vinyl', 'playing');
    if (E && E.wrap && E.wrap.parentNode) E.wrap.remove();
    E = null;
    lastTitle = null;
    lastArtist = null;
  },
  show: function(data) {
    if (!E) this.init();
    lastData = data;
    fitTitle(data.title || '', data.artist || '');
    E.artist.textContent = data.artist || '';
    E.label.src = data.thumbnail || DEFAULT_COVER;
    E.label.classList.add('on');
    widget.classList.toggle('playing', data.state !== 'paused');
    var d = data.duration || 0, c = data.currentTime || 0;
    E.fill.style.width = d > 0 ? Math.min(100, (c / d) * 100) + '%' : '0%';
  },
  showStatus: function(text) {
    if (!E) this.init();
    widget.classList.remove('playing');
    lastTitle = null;
    marqueeGen++;
    cleanupMq();
    E.title.classList.remove('active');
    E.title.innerHTML = '<span class="vn-status">' + (text || '') + '</span>';
    E.artist.textContent = '';
    E.label.src = DEFAULT_COVER;
    E.label.classList.add('on');
    E.fill.style.width = '0%';
  }
};
})();
