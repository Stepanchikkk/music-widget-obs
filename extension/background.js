// Background service worker — опрашивает вкладки
const API_URL = 'http://127.0.0.1:9876/api/update';
let lastSentKey = '';
let lastSource = '';  // hostname последнего играющего источника

function getHostname(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

// Определяем рекламу YouTube по title
function isYTAd(url, msData) {
  if (!msData) return false;
  const t = (msData.title || '').toLowerCase();
  return t.includes('реклама') || t.includes('advertisement') || t.includes('ad ') || t.startsWith('ad|');
}

function checkTab(tab) {
  return new Promise((resolve) => {
    if (!tab.url) { resolve(null); return; }
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('devtools://') || tab.url.startsWith('about:')) {
      resolve(null); return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        let msData = null;
        if ('mediaSession' in navigator && navigator.mediaSession.metadata) {
          const m = navigator.mediaSession.metadata;
          msData = {
            title: m.title || '',
            artist: m.artist || '',
            album: m.album || '',
            artwork: (m.artwork && m.artwork.length > 0) ? m.artwork[m.artwork.length - 1].src : '',
            state: navigator.mediaSession.playbackState || 'none'
          };
        }
        if (!msData || !msData.title) return null;

        let timing = null;
        const slider = document.querySelector('input[type="range"][aria-label="Управление таймкодом"]');
        if (slider) {
          const duration = parseFloat(slider.getAttribute('max')) || 0;
          const current = parseFloat(slider.getAttribute('value')) || 0;
          if (duration > 0) {
            timing = { currentTime: current, duration: duration };
          }
        }

        return { msData, timing };
      }
    }).then((results) => {
      resolve(results?.[0]?.result || null);
    }).catch(() => resolve(null));
  });
}

async function poll() {
  try {
    const tabs = await chrome.tabs.query({});
    let playingTrack = null;
    let pausedTrack = null;

    for (const tab of tabs) {
      const result = await checkTab(tab);
      if (!result?.msData) continue;

      const data = result.msData;
      if (isYTAd(tab.url, data)) continue;

      const source = getHostname(tab.url);

      if (data.state === 'playing') {
        playingTrack = { data, timing: result.timing, source };
        break; // нашли играющий — дальше не ищем
      }

      // Запоминаем последний найденный paused (на случай если нужно fallback)
      if (!pausedTrack && source === lastSource) {
        pausedTrack = { data, timing: result.timing, source };
      }
    }

    // Приоритет: playing > paused из lastSource > nothing
    const bestTrack = playingTrack || pausedTrack;

    if (bestTrack) {
      // Обновляем lastSource если это playing
      if (playingTrack) {
        lastSource = playingTrack.source;
      }

      const key = bestTrack.data.title + '|' + bestTrack.data.artist + '|' + bestTrack.data.state;

      if (key !== lastSentKey) {
        lastSentKey = key;
        const payload = {
          title: bestTrack.data.title,
          artist: bestTrack.data.artist,
          album: bestTrack.data.album,
          thumbnail: bestTrack.data.artwork || '',
          state: bestTrack.data.state,
          ts: Date.now()
        };
        if (bestTrack.timing) {
          payload.currentTime = bestTrack.timing.currentTime;
          payload.duration = bestTrack.timing.duration;
        }

        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } else {
      if (lastSentKey !== 'no_music') {
        lastSentKey = 'no_music';
        lastSource = '';
        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'no_music', ts: Date.now() }),
          keepalive: true
        }).catch(() => {});
      }
    }
  } catch (e) {}

  setTimeout(poll, 1000);
}

poll();

chrome.runtime.onInstalled.addListener(() => {
  console.log('Music Widget Bridge v4.0 installed');
});
