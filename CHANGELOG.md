# Changelog

## [2.0.0] - 2026-06-14

### Added
- Content-скрипт (`content.js`) — чтение музыки через `navigator.mediaSession` и DOM-селекторы Spotify
- Поддержка Яндекс.Музыки: тайминг через `input[aria-label="Управление таймкодом"]`
- Поддержка SoundCloud: тайминг через `role="progressbar"`
- `chrome.tabs.onRemoved` — очистка трека при закрытии вкладки
- `nullCount` — 3 пустых опроса подряд отправляют `trackEnded`
- `beforeunload` — страховка при закрытии/перезагрузке вкладки
- Страховочная чистка треков: 65 секунд без обновления → удаление
- RU/EN переключатель в попапе, язык сохраняется в `chrome.storage.local`
- Источник медиа (hostname вкладки) отображается в строке с заголовком «Сейчас играет»
- Таймер обратного отсчёта в статусе отключения
- `chrome.alarms` heartbeat 15 секунд (вместо 60) для быстрой переподписки
- Обнаружение включённой аутентификации в OBS — сообщение об ошибке
- Параметр `?lang=en` для виджета (текст заглушки на английском)
- Параметр `?port=xxx` для нестандартного порта
- Watchdog 6 секунд в виджете — скрывает данные при пропаже сигнала
- GitHub ссылка в футере попапа

### Changed
- Архитектура: HTTP-сервер (`server.js`) заменён на прямое WebSocket-соединение с obs-websocket
- `popup.html` и `popup.js` полностью переписаны
- Шаги настройки OBS в попапе переведены на русский
- Весь попап теперь с RU/EN локализацией через объект `L10N`
- Размеры окна попапа: 300px → 330px
- Интервал опроса попапа: 3s → 2s
- Иконка в шапке попапа: встроенный SVG → `icon_fg.png`
- Текст заглушки виджета подставляется через `.no-music-text` (сохраняет стилизацию)
- `onerror` в `background.js` — проверка `ws !== sock` перенесена до сброса `wsConnecting`
- Размеры `.no-music-text` приведены к размерам `.track-title` (h/v/compact)
- Название расширения: «Music Widget Bridge» → «Music Widget OBS»
- Описание расширения на русском, с ссылкой на репозиторий
- В manifest.json добавлен blocks `content_scripts` + `storage`/`alarms` permissions
- `host_permissions` с `<all_urls>` для инжекта content-скрипта

### Fixed
- Виджет не показывался повторно при том же треке после срабатывания watchdog
- Текст «Ожидание подключения...» терял стилизацию (ставился на `#no-music` вместо `.no-music-text`)
- `wsConnecting` сбрасывался до проверки `ws !== sock` в обработчике `onerror`
- Прогресс-бар Яндекс.Музыки не реагировал на скролл (использовался `getAttribute('value')` вместо `valueAsNumber`)
- `onclose` не очищал состояние `ws`, `wsAuthenticated`, `wsConnecting`
- `data.currentTime` мог быть `undefined`/`null` в виджете

### Removed
- HTTP-сервер: `server.js`, `launch.vbs`, `restart.bat`, `stop.bat`
- Аутентификация: `computeAuth()`, `wsPassword`, поле пароля, все закомментированные блоки auth
- HTTP-опрос в background.js (`checkTab()`, `poll()`, `setTimeout(poll, 1000)`)
- HTTP-опрос в виджете (`fetchTrack()`, `update()`, `setInterval(update, 2000)`)
- Поле ввода пароля и связанный CSS из попапа
- Кнопка копирования URL для OBS Browser Source
- Отладочный вывод `[wsState/wsAuth/wsConn] port:` из статуса попапа

## [1.1.0] - 2026-06-13

### Changed
- Улучшена поддержка Spotify: чтение тайминга из миллисекундного слайдера

## [1.0.0] - 2026-06-12

### Added
- Первый релиз расширения + сервера + виджета
- HTTP-сервер (`server.js`) для передачи данных в OBS
- Поддержка YouTube, Spotify, Яндекс.Музыки
- Автоматическое определение тайминга из video/audio элементов
- Compact/ориентация виджета
- Marquee-анимация для длинных текстов
- Color extraction из обложки
