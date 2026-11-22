(function(){
var BASE = (function(){ var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : ''; })();
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = BASE + 'style.css';
link.addEventListener('load', function () { if (E && lastTitle !== null) layout(lastTitle); });
document.head.appendChild(link);

var S = window.__STYLES = window.__STYLES || {};
var E = null;
var lastTitle = null;
var lastArtist = null;

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

function setProgress(pct) {
  if (!E || !E.fill) return;
  E.fill.style.width = Math.max(0, Math.min(100, pct)) + '%';
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
        var mx = Math.max(a[0], a[1], a[2]) || 1;
        var k = 215 / mx;
        var b = [Math.min(255, Math.round(a[0] * k)), Math.min(255, Math.round(a[1] * k)), Math.min(255, Math.round(a[2] * k))];
        a = b;
        E.wrap.style.setProperty('--acc', 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
        E.wrap.style.setProperty('--acc-bg', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.22)');
        E.wrap.style.setProperty('--acc-dim', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.6)');
        E.wrap.style.setProperty('--acc-glow', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.55)');
        E.wrap.style.setProperty('--acc-halo', 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',0.38)');
        var t = [0,1,2].map(function(i){ return Math.min(255, Math.round(a[i] + (255 - a[i]) * 0.55)); });
        E.wrap.style.setProperty('--acc-text', 'rgb(' + t[0] + ',' + t[1] + ',' + t[2] + ')');
      }
    } catch (e) {}
  };
  im.src = url;
}

var lastThumb = null;
var lastData = null;

S.karaoke = {
  init: function() {
    if (E) return;
    widget.classList.add('karaoke');
    var wrap = document.createElement('div');
    wrap.className = 'kr-wrap';
    wrap.innerHTML = '<div class="kr-artist"></div>' +
      '<div class="kr-title-wrap"><div class="kr-title"></div></div>' +
      '<div class="kr-bar"><div class="kr-fill"></div></div>' +
      '<div class="kr-meta"><span class="kr-cur">0:00</span><span class="kr-dur">0:00</span></div>';
    widget.appendChild(wrap);
    E = {
      wrap: wrap,
      artist: wrap.querySelector('.kr-artist'),
      titleWrap: wrap.querySelector('.kr-title-wrap'),
      title: wrap.querySelector('.kr-title'),
      fill: wrap.querySelector('.kr-fill'),
      cur: wrap.querySelector('.kr-cur'),
      dur: wrap.querySelector('.kr-dur')
    };
    lastTitle = null;
    lastArtist = null;
    lastThumb = null;
    setProgress(0);
  },
  destroy: function() {
    widget.classList.remove('karaoke', 'playing');
    if (E && E.wrap && E.wrap.parentNode) E.wrap.remove();
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
    if (data.title !== lastTitle || data.artist !== lastArtist) {
      lastTitle = data.title || '';
      lastArtist = data.artist || '';
      E.artist.textContent = data.artist || '';
      layout(data.title || '');
    }
    accent(data.thumbnail);
    widget.classList.toggle('playing', data.state !== 'paused');
    var d = data.duration || 0, c = data.currentTime || 0;
    E.cur.textContent = fmt(c || 0);
    E.dur.textContent = fmt(d || 0);
    setProgress(d > 0 ? (c / d) * 100 : 0);
  },
  showStatus: function(text) {
    if (!E) this.init();
    widget.classList.remove('playing');
    lastTitle = null;
    lastArtist = null;
    marqueeGen++;
    cleanupMq();
    E.artist.textContent = '';
    E.title.classList.remove('active');
    E.title.innerHTML = '<span style="color:rgba(255,255,255,0.55)">' + (text || '') + '</span>';
    E.cur.textContent = '0:00';
    E.dur.textContent = '0:00';
    setProgress(0);
  }
};
})();
