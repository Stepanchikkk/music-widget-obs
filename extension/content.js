if (window.__mwContentScriptLoaded) { /* already loaded */ } else {
window.__mwContentScriptLoaded = true;

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
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    const m = node.textContent.trim().match(/^(\d+):(\d{2})\s*[/]\s*(\d+):(\d{2})$/);
    if (m) {
      const cur = parseInt(m[1]) * 60 + parseInt(m[2]);
      const dur = parseInt(m[3]) * 60 + parseInt(m[4]);
      if (dur > 0) return { currentTime: cur, duration: dur };
    }
  }
  return null;
}

function readDomMedia() {
  const titleEl = document.querySelector('[data-testid="context-item-info-title"]');
  const artistEl = document.querySelector('[data-testid="context-item-info-artist"]');
  if (!titleEl || !artistEl) return null;
  const title = titleEl.textContent?.trim() || '';
  const artist = artistEl.textContent?.trim() || '';
  const img = document.querySelector('[data-testid="cover-art-image"]');
  const artwork = img?.src || '';
  const playBtn = document.querySelector('[data-testid="control-button-playpause"]');
  const label = playBtn?.getAttribute('aria-label') || '';
  return { title, artist, artwork, state: (label === 'Пауза' || label === 'Pause') ? 'playing' : 'paused' };
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

function isCanvasClip() {
  const els = document.querySelectorAll('video');
  for (const el of els) {
    if (el.muted || el.volume === 0) return true;
  }
  return false;
}

function isYTAd(data) {
  const t = (data.title || '').toLowerCase();
  return t.includes('реклама') || t.includes('advertisement') || t.includes('ad ') || t.startsWith('ad|');
}

let nullCount = 0;

window.addEventListener('beforeunload', () => {
  try { chrome.runtime.sendMessage({ type: 'trackEnded' }).catch(() => {}); } catch (e) {}
});

const intervalId = setInterval(() => {
  try {
    if (!chrome.runtime?.id) { clearInterval(intervalId); return; }

    const data = readMedia() || readDomMedia();
    if (!data) {
      if (isCanvasClip()) return;
      nullCount++;
      if (nullCount >= 3) {
        chrome.runtime.sendMessage({ type: 'trackEnded' }).catch(() => {});
        nullCount = 0;
      }
      return;
    }
    nullCount = 0;
    if (isYTAd(data)) return;

    const timing = readTiming() || readVideoTiming() || readDomTiming();

    chrome.runtime.sendMessage({
      type: 'mediaSessionUpdate',
      data: {
        title: data.title,
        artist: data.artist,
        album: data.album,
        thumbnail: data.artwork || '',
        state: data.state,
        muted: isMuted(),
        currentTime: timing?.currentTime || 0,
        duration: timing?.duration || 0,
        ts: Date.now()
      }
    }).catch(() => clearInterval(intervalId));
  } catch (e) {
    clearInterval(intervalId);
  }
}, 1000);

}