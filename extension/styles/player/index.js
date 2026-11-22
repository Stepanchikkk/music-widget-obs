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
var lastThumb = null;
var resizeTimer = null;
var lastData = null;

function txtWidth(el) {
  var r = document.createRange();
  r.selectNodeContents(el);
  return r.getBoundingClientRect().width;
}

function measure(text) {
  E.title.classList.remove('active');
  E.title.style.animation = '';
  E.title.innerHTML = '<span>' + (text || '') + '</span>';
  return txtWidth(E.title);
}

function layout(title) {
  if (!E) return;
  var tw = measure(title);
  var cw = E.titleWrap.clientWidth;
  marqueeGen++;
  cleanupMq();
  if (tw > cw + 2 && cw > 0) {
    E.title.innerHTML = '<span>' + (title || '') + '</span><span>' + (title || '') + '</span>';
    var fs2 = parseFloat(getComputedStyle(E.title).fontSize) || 16;
    var dur = Math.max(8000, ((tw + fs2 * 3) / 55) * 1000);
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

function accent(url) {
  if (!url || url === lastThumb) return;
  lastThumb = url;
  var im = new Image();
  im.crossOrigin = 'anonymous';
  im.onload = function () {
    try {
      var c = colors(im);
      var a = c && c.light ? c.light : null;
      if (a) {
        E.wrap.style.setProperty('--acc', 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
        E.wrap.style.setProperty('--acc-soft', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.5)');
        E.wrap.style.setProperty('--acc-bg', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.22)');
      }
    } catch (e) {}
  };
  im.src = url;
}

function fallbackAccent() {
  if (!E) return;
  E.wrap.style.setProperty('--acc', '#ff4d8d');
  E.wrap.style.setProperty('--acc-soft', 'rgba(255, 77, 141, 0.5)');
  E.wrap.style.setProperty('--acc-bg', 'rgba(255, 77, 141, 0.16)');
}

function fitTitle(text, artist) {
  if (text === lastTitle && artist === lastArtist) return;
  lastTitle = text;
  lastArtist = artist;
  layout(text);
}

S.player = {
  init: function() {
    if (E) return;
    widget.classList.add('player');
    var wrap = document.createElement('div');
    wrap.className = 'pl-wrap';
    wrap.innerHTML = '<div class="pl-art"><div class="pl-rotor"><img class="pl-img" alt=""></div><div class="pl-ring"></div>' +
      '<div class="pl-badge"><div class="pl-tri"></div><div class="pl-pause"><i></i><i></i></div></div></div>' +
      '<div class="pl-panel"><div class="pl-title-wrap"><div class="pl-title"></div></div>' +
      '<div class="pl-artist"></div>' +
      '<div class="pl-times"><span class="pl-cur">0:00</span><span class="pl-dur">0:00</span></div>' +
      '<div class="pl-bar"><div class="pl-fill"></div></div></div>';
    widget.appendChild(wrap);
    E = {
      wrap: wrap,
      img: wrap.querySelector('.pl-img'),
      titleWrap: wrap.querySelector('.pl-title-wrap'),
      title: wrap.querySelector('.pl-title'),
      artist: wrap.querySelector('.pl-artist'),
      cur: wrap.querySelector('.pl-cur'),
      dur: wrap.querySelector('.pl-dur'),
      fill: wrap.querySelector('.pl-fill')
    };
    E.img.onerror = function () {
      if (E.img.src.indexOf('default-cover') === -1) {
        E.img.src = DEFAULT_COVER;
        widget.classList.add('noart');
        lastThumb = null;
        fallbackAccent();
      }
    };
    lastTitle = null;
    lastArtist = null;
    lastThumb = null;
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    if (!window.__playerResizeBound) {
      window.__playerResizeBound = true;
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
    widget.classList.remove('player', 'playing');
    if (E && E.wrap && E.wrap.parentNode) E.wrap.remove();
    if (resizeTimer) { clearTimeout(resizeTimer); resizeTimer = null; }
    marqueeGen++;
    cleanupMq();
    E = null;
    lastTitle = null;
    lastArtist = null;
    lastThumb = null;
  },
  show: function(data) {
    if (!E) this.init();
    lastData = data;
    fitTitle(data.title || '', data.artist || '');
    E.artist.textContent = data.artist || '';
    if (data.thumbnail) {
      E.img.src = data.thumbnail;
      E.img.classList.add('on');
      widget.classList.remove('noart');
      accent(data.thumbnail);
    } else {
      E.img.src = DEFAULT_COVER;
      E.img.classList.add('on');
      widget.classList.add('noart');
      fallbackAccent();
      lastThumb = null;
    }
    widget.classList.toggle('playing', data.state !== 'paused');
    var d = data.duration || 0, c = data.currentTime || 0;
    E.cur.textContent = fmt(c || 0);
    E.dur.textContent = fmt(d || 0);
    E.fill.style.width = d > 0 ? Math.min(100, (c / d) * 100) + '%' : '0%';
  },
  showStatus: function(text) {
    if (!E) this.init();
    widget.classList.remove('playing');
    lastTitle = null;
    marqueeGen++;
    cleanupMq();
    E.title.classList.remove('active');
    E.title.innerHTML = '<span class="pl-status">' + (text || '') + '</span>';
    E.artist.textContent = '';
    E.img.src = DEFAULT_COVER;
    E.img.classList.add('on');
    widget.classList.add('noart');
    E.cur.textContent = '0:00';
    E.dur.textContent = '0:00';
    E.fill.style.width = '0%';
  }
};
})();
