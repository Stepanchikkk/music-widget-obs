const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const statusHint = document.getElementById('statusHint');
const trackSection = document.getElementById('trackSection');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackSource = document.getElementById('trackSource');
const portInput = document.getElementById('portInput');
const saveBtn = document.getElementById('saveBtn');

function updateStatus(status, alarm) {
  if (status.connected) {
    statusDot.className = 'dot connected';
    if (status.track) {
      statusText.innerHTML = 'WebSocket: подключен';
      trackSection.style.display = 'block';
      trackTitle.textContent = status.track.title || '\u2014';
      trackArtist.textContent = status.track.artist || '\u2014';
      trackSource.textContent = status.source || '';
    } else {
      statusText.innerHTML = 'WebSocket: подключен';
      trackSection.style.display = 'none';
    }
    statusHint.textContent = '';
  } else {
    statusDot.className = 'dot disconnected';
    statusText.innerHTML = 'WebSocket: не подключ\u00EBн';
    trackSection.style.display = 'none';

    const d = status.debug;
    let msg = d && d.error ? d.error : (status.reason || '');
    if (msg === 'auth_required') msg = 'В OBS включён вход в аккаунт (аутентификация). Откройте Сервис → Настройки сервера WebSocket и снимите галочку "Включить вход в аккаунт"';
    else if (msg === 'connection_error') msg = 'Не удалось подключиться к OBS. Убедитесь что OBS запущен и WebSocket сервер включён, проверьте порт (текущий: ' + (d ? d.port : '') + ')';
    else if (msg === 'timeout') msg = 'OBS не отвечает. Убедитесь что OBS запущен и WebSocket сервер включён, проверьте порт (текущий: ' + (d ? d.port : '') + ')';
    else if (msg === 'send_failed') msg = 'Ошибка отправки данных. Проверьте порт WebSocket сервера';
    else if (msg.startsWith && msg.startsWith('close_')) msg = 'Соединение закрыто с кодом ' + msg.slice(6) + '. Проверьте порт (текущий: ' + (d ? d.port : '') + ') и что аутентификация выключена в настройках WebSocket сервера';
    if (!msg) msg = 'Проверьте что OBS запущен и WebSocket сервер включён (Сервис → Настройки сервера WebSocket)';
    if (alarm) {
      const secs = Math.max(0, Math.round((alarm.scheduledTime - Date.now()) / 1000));
      if (secs > 0) msg += ' • повтор через ' + secs + 'с';
    }
    statusHint.textContent = msg;
  }

  if (status.connected && !status.track && status.tabs !== undefined) {
    if (status.tabs === 0) {
      statusHint.textContent = 'Нет вкладок с медиа. Убедитесь что музыка играет через YouTube, Яндекс.Музыку или другой сервис с MediaSession API';
    } else {
      statusHint.textContent = 'Вкладок с медиа: ' + status.tabs + ', ожидание трека...';
    }
  }
}

async function checkStatus() {
  try {
    const [response, alarm] = await Promise.all([
      chrome.runtime.sendMessage({ type: 'getStatus' }),
      chrome.alarms.get('heartbeat')
    ]);
    if (response) {
      updateStatus(response, alarm);
    } else {
      updateStatus({ connected: false, reason: 'error' }, alarm);
    }
  } catch (e) {
    updateStatus({ connected: false, reason: 'error' });
  }
}

function loadSettings() {
  chrome.storage.local.get({ wsPort: '4455' }, (items) => {
    portInput.value = items.wsPort;
  });
}

function saveSettings() {
  const port = portInput.value.trim() || '4455';
  chrome.storage.local.set({ wsPort: port }, () => {
    statusDot.className = 'dot connecting';
    statusText.textContent = 'WebSocket: подключение...';
    statusHint.textContent = '';
    chrome.runtime.sendMessage({ type: 'reconnect', wsPort: port });
  });
}

saveBtn.addEventListener('click', saveSettings);

portInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveSettings();
});

loadSettings();
checkStatus();
setInterval(checkStatus, 2000);
