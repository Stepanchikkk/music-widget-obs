// Popup — статус, подсказки, копирование ссылки
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const trackInfo = document.getElementById('trackInfo');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const hintBox = document.getElementById('hintBox');
const hintText = document.getElementById('hintText');
const copyBtn = document.getElementById('copyBtn');

const SERVER = 'http://127.0.0.1:9876';

// Копирование ссылки
copyBtn.addEventListener('click', async () => {
  const url = document.getElementById('linkUrl').value;
  try {
    await navigator.clipboard.writeText(url);
    copyBtn.textContent = 'Скопировано!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Копировать';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (e) {
    const input = document.getElementById('linkUrl');
    input.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Скопировано!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Копировать';
      copyBtn.classList.remove('copied');
    }, 2000);
  }
});

async function checkStatus() {
  try {
    const resp = await fetch(SERVER + '/api/track', { signal: AbortSignal.timeout(2000) });
    if (resp.ok) {
      const data = await resp.json();
      if (data.error) {
        statusDot.className = 'dot waiting';
        statusText.textContent = 'Сервер работает — ждём музыку...';
        trackInfo.style.display = 'none';
        hintBox.style.display = 'none';
        markStep(1, true);
        markStep(2, false);
        markStep(4, false);
      } else {
        statusDot.className = 'dot connected';
        statusText.textContent = 'Музыка играет';
        trackInfo.style.display = 'block';
        trackTitle.textContent = data.title || '—';
        trackArtist.textContent = data.artist || '—';
        hintBox.style.display = 'none';
        markStep(1, true);
        markStep(2, true);
        markStep(4, true);
      }
    } else {
      throw new Error('not ok');
    }
  } catch (e) {
    statusDot.className = 'dot error';
    statusText.textContent = 'Сервер не запущен';
    trackInfo.style.display = 'none';

    hintBox.style.display = 'block';
    hintText.innerHTML =
      'Сервер не отвечает. Для запуска открой ' +
      '<code>music-widget-obs\\launch.vbs</code><br>' +
      'Перезапуск — <code>restart.bat</code>, остановка — <code>stop.bat</code>';

    markStep(1, false);
    markStep(2, false);
    markStep(3, false);
  }
}

function markStep(num, done) {
  const el = document.getElementById('step' + num);
  if (!el) return;
  if (done) el.classList.add('done');
  else el.classList.remove('done');
}

checkStatus();
setInterval(checkStatus, 3000);
