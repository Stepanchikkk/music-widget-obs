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

function fitTitle(text, artist) {
  if (text === lastTitle && artist === lastArtist) return;
  lastTitle = text;
  lastArtist = artist;
  layout(text);
}

S.cover = {
  init: function() {
    if (E) return;
    widget.classList.add('cover');
    var wrap = document.createElement('div');
    wrap.className = 'cv-wrap';
    wrap.innerHTML = '<div class="cv-art"><img class="cv-img" alt=""></div>' +
      '<div class="cv-body"><div class="cv-title-wrap"><div class="cv-title"></div></div><div class="cv-artist"></div><div class="cv-bar"><div class="cv-fill"></div></div></div>';
    widget.appendChild(wrap);
    E = {
      wrap: wrap,
      art: wrap.querySelector('.cv-art'),
      body: wrap.querySelector('.cv-body'),
      img: wrap.querySelector('.cv-img'),
      title: wrap.querySelector('.cv-title'),
      artist: wrap.querySelector('.cv-artist'),
      fill: wrap.querySelector('.cv-fill')
    };
    E.img.onerror = function () {
      if (E.img.src.indexOf('default-cover') === -1) E.img.src = DEFAULT_COVER;
    };
    lastTitle = null;
    lastArtist = null;
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    if (!window.__coverResizeBound) {
      window.__coverResizeBound = true;
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
    widget.classList.remove('cover', 'playing');
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
      E.img.classList.add('on');
    } else {
      E.img.src = DEFAULT_COVER;
      E.img.classList.add('on');
    }
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
    E.title.innerHTML = '<span class="cv-status">' + (text || '') + '</span>';
    E.artist.textContent = '';
    E.img.src = DEFAULT_COVER;
    E.img.classList.add('on');
    E.fill.style.width = '0%';
  }
};
})();
