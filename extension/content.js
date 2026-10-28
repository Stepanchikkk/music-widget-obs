(function(){
if (window.__mwContentInterval) { clearInterval(window.__mwContentInterval); window.__mwContentInterval = null; }

function readMedia() {
  const ms = navigator.mediaSession;
  if (!ms || !ms.metadata) return null;
  const m = ms.metadata;
  return {
    title: m.title || '',
    artist: m.artist || '',
    album: m.album || '',
    artwork: (m.artwork && m.artwork.length > 0) ? m.artwork[m.artwork.length - 1].src : '',
    state: ms.playbackState === 'paused' ? 'paused' : 'playing'
  };
}

function readTiming() {
  const slider = document.querySelector('input[type="range"][aria-label="Управление таймкодом"]');
  if (!slider) return null;
  const duration = parseFloat(slider.getAttribute('max')) || 0;
  const current = slider.valueAsNumber || 0;
  if (duration <= 0) return null;
  return { currentTime: current, duration };
}

function readVideoTiming() {
  const videos = document.querySelectorAll('video, audio');
  for (const el of videos) {
    const d = el.duration;
    if (d && !isNaN(d) && d > 0) {
      if (d < 20 && (el.muted || el.volume === 0)) continue;
      return { currentTime: el.currentTime, duration: d };
    }
  }
  return null;
}

var timeTextNode = null;
function parseTimeText(text) {
  const m = (text || '').trim().match(/^(\d+):(\d{2})\s*[/]\s*(\d+):(\d{2})$/);
  if (!m) return null;
  const cur = parseInt(m[1]) * 60 + parseInt(m[2]);
  const dur = parseInt(m[3]) * 60 + parseInt(m[4]);
  return dur > 0 ? { currentTime: cur, duration: dur } : null;
}

function readDomTiming() {
  // Spotify: range input with ms values
  const spotSlider = document.querySelector('[data-testid="playback-progressbar"] input[type="range"]');
  if (spotSlider) {
    const max = parseFloat(spotSlider.getAttribute('max')) || 0;
    const val = parseFloat(spotSlider.getAttribute('value')) || spotSlider.valueAsNumber || 0;
    if (max > 0) return { currentTime: val / 1000, duration: max / 1000 };
  }

  // Progressbar with seconds (SoundCloud, etc.)
  const progBar = document.querySelector('[role="progressbar"][aria-valuemax]');
  if (progBar) {
    const max = parseFloat(progBar.getAttribute('aria-valuemax')) || 0;
    const now = parseFloat(progBar.getAttribute('aria-valuenow')) || 0;
    if (max > 0) return { currentTime: now, duration: max };
  }

  // Generic: text like "1:23 / 4:56"
  if (timeTextNode && timeTextNode.isConnected) {
    const cached = parseTimeText(timeTextNode.textContent);
    if (cached) return cached;
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    const parsed = parseTimeText(node.textContent);
    if (parsed) { timeTextNode = node; return parsed; }
  }
  return null;
}

function readDomMedia() {
  // The-Radio.ru: свой плеер "bird", mediaSession не использует.
  if (location.hostname.indexOf('the-radio.ru') !== -1) {
    const zone = document.querySelector('.pla-title-zone');
    if (!zone) return null;
    const alone = zone.querySelector('.pla-alone');
    const artistNode = zone.querySelector('.pla-artist');
    const songNode = zone.querySelector('.pla-song');
    const img = document.querySelector('.pla-control .pla-ava img');
    const stationImg = document.querySelector('.pla-radio .pla-ava img, .pla-ava--station img');
    const rTitle = alone ? alone.textContent.trim() : (songNode ? songNode.textContent.trim() : '');
    const rArtist = artistNode ? artistNode.textContent.trim() : '';
    if (!rTitle && !rArtist) return null;
    const nameEl = document.querySelector('.pla-info .pla-name');
    var station = nameEl ? nameEl.textContent.trim() : '';
    if (!station || station === 'Выберите радиостанцию') {
      var curLink = document.querySelector('.simmyradio__current[data-r-name]');
      station = curLink ? (curLink.getAttribute('data-r-name') || '') : '';
    }
    if (!station && document.title) {
      station = document.title.indexOf('|') !== -1 ? document.title.split('|').pop().trim() : (document.title.split('—')[0] || '').trim();
    }
    const cast = document.querySelector('.pla-cast');
    const isPlaying = cast ? (cast.classList.contains('pla-cast--stop') || cast.classList.contains('pla-cast--load')) : false;
    // Иконка громкости у сайта бывает в mute при реально играющем звуке
    // (volume 0.02 + audible), поэтому приоритет радио не занижаем.
    const art = (img && img.src) ? img.src : (stationImg && stationImg.src ? stationImg.src : '');
    return { title: rTitle, artist: rArtist, album: station, artwork: art, state: isPlaying ? 'playing' : 'paused', muted: false };
  }
  const titleEl = document.querySelector('[data-testid="context-item-info-title"]');
  const artistEl = document.querySelector('[data-testid="context-item-info-artist"]');
  if (!titleEl || !artistEl) return null;
  const title = titleEl.textContent?.trim() || '';
  const artist = artistEl.textContent?.trim() || '';
  const img = document.querySelector('[data-testid="cover-art-image"]') ||
              document.querySelector('aside img[src*="image"]') ||
              document.querySelector('aside img');
  const artwork = img?.src || '';
  const playBtn = document.querySelector('[data-testid="control-button-playpause"]');
  const label = playBtn?.getAttribute('aria-label') || '';
  return { title, artist, artwork, state: (label === 'Пауза' || label === 'Pause') ? 'playing' : 'paused' };
}

function pickPrimaryMedia() {
  var els = document.querySelectorAll('video, audio');
  var best = null, bestScore = -1;
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (location.hostname.indexOf('the-radio.ru') !== -1 && el.id === 'hlsplay') continue;
    // Живые потоки (Twitch и т.п.) имеют duration Infinity/NaN — их тоже надо
    // рассматривать, иначе главным станет доигравший декоративный элемент.
    if (isPreviewVideo(el)) continue;
    if (!el.currentSrc && el.readyState === 0) continue;
    var d = el.duration;
    var finite = isFinite(d) && d > 0;
    if (finite && d < 20 && (el.muted || el.volume === 0)) continue;
    var score = 0;
    if (!el.paused && !el.ended) score += 4;
    if (el.ended) score -= 10;
    if (!el.muted && el.volume > 0) score += 2;
    score += finite ? Math.min(d, 3600) / 900 : (el.paused ? 0 : 4);
    if (score > bestScore) { bestScore = score; best = el; }
  }
  return best;
}

function isMuted() {
  const els = document.querySelectorAll('video, audio');
  for (const el of els) {
    if (el.duration && !isNaN(el.duration) && el.duration > 0) {
      if (el.duration < 20 && (el.muted || el.volume === 0)) continue;
      return el.muted || el.volume === 0;
    }
  }
  return false;
}

function isYTAd(data) {
  if (location.hostname.indexOf('youtube') === -1) return false;
  const t = (data.title || '').toLowerCase();
  return t.includes('реклама') || t.includes('advertisement') || t.includes('ad ') || t.startsWith('ad|');
}

let nullCount = 0;
var radioLog = [];
let ghostCount = 0;
var thumbDataUrlCache = {};
var lastPausedTime = -1;
if (!window.__mwUnloadBound) {
  window.__mwUnloadBound = true;
  window.addEventListener('beforeunload', () => {
    try { chrome.runtime.sendMessage({ type: 'trackEnded' }).catch(() => {}); } catch (e) {}
  });
}

function isYouTubeNonWatch() {
  if (location.hostname.indexOf('youtube.com') === -1) return false;
  return !/^\/(watch|shorts|live|embed)\b/.test(location.pathname);
}

function isPreviewVideo(el) {
  if (!el || el.tagName !== 'VIDEO') return false;
  try {
    return !!el.closest('ytd-video-preview, #inline-preview-player, .ytp-inline-preview, ytd-thumbnail-overlay-inline-player');
  } catch (e) { return false; }
}

function isGhostMedia(el) {
  if (!el) return isYouTubeNonWatch() && !readDomMedia();
  if (el.tagName !== 'VIDEO') return false;
  if (!el.paused || el.ended) return false;
  if (el.videoWidth > 0 || el.videoHeight > 0) return false;
  var r = el.getBoundingClientRect();
  if (r.width > 1 || r.height > 1) return false;
  if (readDomMedia()) return false;
  if (isYouTubeNonWatch()) return true;
  if (el.currentTime > 0.001) return false;
  var ms = navigator.mediaSession;
  return !ms || ms.playbackState === 'none';
}

function theRadioDiag() {
  if (location.hostname.indexOf('the-radio.ru') === -1) return null;
  var q = function(s) { var e = document.querySelector(s); return e; };
  var cast = q('.pla-cast'), vol = q('.pla-vol-ico'), zone = q('.pla-title-zone');
  var hls = document.getElementById('hlsplay');
  return {
    cast: cast ? cast.className : '',
    vol: vol ? vol.className : '',
    zone: zone ? zone.innerText : '',
    alone: q('.pla-alone') ? q('.pla-alone').textContent : '',
    artist: q('.pla-artist') ? q('.pla-artist').textContent : '',
    song: q('.pla-song') ? q('.pla-song').textContent : '',
    name: q('.pla-info .pla-name') ? q('.pla-info .pla-name').textContent : '',
    min: q('#pla-min') ? q('#pla-min').textContent : '',
    sec: q('#pla-sec') ? q('#pla-sec').textContent : '',
    hls: hls ? { paused: hls.paused, readyState: hls.readyState, duration: isFinite(hls.duration) ? hls.duration : String(hls.duration), currentTime: hls.currentTime } : null
  };
}

function buildDiag() {
  var ms = navigator.mediaSession;
  var meta = ms && ms.metadata;
  var list = [];
  var els = document.querySelectorAll('video, audio');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var r = el.getBoundingClientRect();
    list.push({ tag: el.tagName, id: el.id || '', cls: (typeof el.className === 'string' ? el.className : '').slice(0, 60), paused: !!el.paused, ended: !!el.ended, muted: !!el.muted, volume: el.volume, duration: isFinite(el.duration) ? el.duration : String(el.duration), currentTime: el.currentTime, readyState: el.readyState, src: (el.currentSrc || el.src || '').slice(0, 120), w: Math.round(r.width), h: Math.round(r.height) });
  }
  var p = pickPrimaryMedia();
  return {
    url: location.href, path: location.pathname, visibility: document.visibilityState, polling: !!window.__mwContentInterval,
    mediaSession: ms ? { playbackState: ms.playbackState, hasMetadata: !!meta, title: (meta && meta.title) || '', artist: (meta && meta.artist) || '', album: (meta && meta.album) || '', artworkCount: (meta && meta.artwork) ? meta.artwork.length : 0 } : null,
    domMedia: readDomMedia(),
    primary: p ? { tag: p.tagName, id: p.id || '', paused: !!p.paused, ended: !!p.ended, muted: !!p.muted, duration: isFinite(p.duration) ? p.duration : String(p.duration), currentTime: p.currentTime, readyState: p.readyState } : null,
    theRadio: theRadioDiag(),
    radioLog: radioLog.slice(),
    media: list
  };
}

if (!window.__mwPingBound) {
  window.__mwPingBound = true;
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg && msg.type === 'ping') {
      if (!window.__mwContentInterval && window.__mwContentStart) window.__mwContentStart();
      sendResponse({ ok: true, polling: !!window.__mwContentInterval });
    } else if (msg && msg.type === 'diag') {
      sendResponse(buildDiag());
    }
  });
}

if (!window.__mwMediaEventsBound) {
  window.__mwMediaEventsBound = true;
  ['play','pause','seeking','seeked','ratechange','durationchange','ended','volumechange'].forEach(function(ev) {
    document.addEventListener(ev, function() { if (window.__mwContentTick) window.__mwContentTick(); }, true);
  });
}

var spotifyHiCache = {};
var spotifyHiPending = {};
var spotifyHiFail = {};

// Spotify кодирует размер обложки в пути: 00004851 = 64, 00001e02 = 300, 0000b273 = 640.
// В DOM часто лежит маленькая обложка из плеера, поэтому просим сразу 640.
function upgradeSpotifyArt(url) {
  var m = String(url).match(/^https:\/\/i\.scdn\.co\/image\/([0-9a-f]{8})[0-9a-f]{8}([0-9a-f]+)(.*)$/);
  if (!m) return url;
  return 'https://i.scdn.co/image/' + m[1] + '0000b273' + m[2] + m[3];
}

function loadSpotifyHi(url) {
  var im = new Image();
  im.crossOrigin = 'anonymous';
  im.onload = function() {
    try {
      var mw = im.naturalWidth, mh = im.naturalHeight;
      var sc = Math.min(1, 640 / Math.max(mw, mh));
      var c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(mw * sc));
      c.height = Math.max(1, Math.round(mh * sc));
      var ctx = c.getContext('2d');
      ctx.drawImage(im, 0, 0, c.width, c.height);
      var dt = c.toDataURL('image/jpeg', 0.82);
      if (dt && dt.length > 200) {
        for (var k in spotifyHiCache) if (k !== url) delete spotifyHiCache[k];
        spotifyHiCache[url] = dt;
      }
    } catch (e) {}
    spotifyHiPending[url] = false;
  };
  im.onerror = function() { spotifyHiPending[url] = false; spotifyHiFail[url] = true; };
  im.src = url;
}

function sendTrack(data) {
  chrome.runtime.sendMessage({ type: 'mediaSessionUpdate', data }).catch(() => {
    setTimeout(() => {
      if (chrome.runtime?.id) sendTrack(data);
    }, 500);
  });
}

function tick() {
  try {
    if (!chrome.runtime?.id) { clearInterval(window.__mwContentInterval); window.__mwContentInterval = null; return; }

    var data = readMedia();
    if (data) {
      var dom = readDomMedia();
      if (dom) {
        if (dom.artwork) data.artwork = dom.artwork;
        data.state = dom.state;
      }
    } else {
      data = readDomMedia();
    }
    if (!data) {
      if (location.hostname.indexOf('the-radio.ru') !== -1) { radioLog.push({ t: Date.now(), path: location.pathname, cast: (document.querySelector('.pla-cast') || {}).className || '', state: null, title: '' }); if (radioLog.length > 30) radioLog.shift(); }
      nullCount++;
      if (nullCount >= 10) {
        chrome.runtime.sendMessage({ type: 'trackEnded' }).catch(() => {});
        nullCount = 0; thumbDataUrlCache = {}; lastPausedTime = -1;
      }
      return;
    }
    var primary = pickPrimaryMedia();
    if (isGhostMedia(primary)) {
      ghostCount++;
      if (ghostCount >= 3) {
        ghostCount = 0;
        chrome.runtime.sendMessage({ type: 'trackEnded' }).catch(() => {});
      }
      return;
    }
    ghostCount = 0;
    nullCount = 0;
    if (primary) data.state = primary.paused ? 'paused' : 'playing';
    if (isYTAd(data)) return;

    const timing = readTiming() || (primary && isFinite(primary.duration) && primary.duration > 0 ? { currentTime: primary.currentTime, duration: primary.duration } : null) || readVideoTiming() || readDomTiming();
    var curTime = timing?.currentTime || 0;
    var dur = timing?.duration || 0;
    // The-Radio.ru — живой поток: duration/currentTime HLS-элемента не про песню.
    // Берём текущее время из счётчика плеера (#pla-min/#pla-sec), общего нет.
    if (location.hostname.indexOf('the-radio.ru') !== -1) {
      var mn = document.querySelector('#pla-min');
      var sc = document.querySelector('#pla-sec');
      curTime = (mn ? (parseInt(mn.textContent, 10) || 0) : 0) * 60 + (sc ? (parseInt(sc.textContent, 10) || 0) : 0);
      dur = 0;
      radioLog.push({ t: Date.now(), path: location.pathname, cast: (document.querySelector('.pla-cast') || {}).className || '', state: data.state, title: data.title || '', cur: curTime });
      if (radioLog.length > 30) radioLog.shift();
    }

    if (data.state === 'paused') {
      if (lastPausedTime < 0) lastPausedTime = curTime;
      curTime = lastPausedTime;
    } else {
      lastPausedTime = -1;
    }
    // Радио: таймер берём из DOM каждый тик, чтобы он шёл ровно как в плеере (в т.ч. на паузе).
    if (location.hostname.indexOf('the-radio.ru') !== -1) lastPausedTime = -1;

    var thumb = data.artwork || '';

    if (thumb && thumb.includes('i.scdn.co')) {
      var hi = upgradeSpotifyArt(thumb);
      if (hi !== thumb && spotifyHiCache[hi]) {
        thumb = spotifyHiCache[hi];
      } else {
        if (hi !== thumb && !spotifyHiPending[hi] && !spotifyHiFail[hi]) {
          spotifyHiPending[hi] = true;
          loadSpotifyHi(hi);
        }
        if (thumbDataUrlCache[thumb]) {
          thumb = thumbDataUrlCache[thumb];
        } else {
          try {
            var imgEl = document.querySelector('[data-testid="cover-art-image"], aside img[src*="image"], aside img');
            if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
              var iw = imgEl.naturalWidth, ih = imgEl.naturalHeight;
              var scale = Math.min(1, 512 / Math.max(iw, ih));
              var c = document.createElement('canvas');
              c.width = Math.max(1, Math.round(iw * scale));
              c.height = Math.max(1, Math.round(ih * scale));
              var ctx = c.getContext('2d');
              ctx.drawImage(imgEl, 0, 0, c.width, c.height);
              var dt = c.toDataURL('image/jpeg', 0.78);
              if (dt && dt.length > 200) {
                for (var k in thumbDataUrlCache) if (k !== thumb) delete thumbDataUrlCache[k];
                thumbDataUrlCache[thumb] = dt;
                thumb = dt;
              }
            }
          } catch(e) {}
        }
      }
    }

    sendTrack({
      title: data.title,
      artist: data.artist,
      album: data.album,
      thumbnail: thumb,
      state: data.state,
      muted: (data.muted !== undefined) ? data.muted : (primary ? (primary.muted || primary.volume === 0) : isMuted()),
      currentTime: curTime,
      duration: dur,
      ts: Date.now()
    });
  } catch (e) {
    if (!window.__mwErrLogged) { window.__mwErrLogged = true; console.warn('MW content error', e); }
  }
}

window.__mwContentStart = function() {
  if (window.__mwContentInterval) return;
  window.__mwContentTick = tick;
  window.__mwContentInterval = setInterval(tick, 1000);
};
window.__mwContentStart();

})();