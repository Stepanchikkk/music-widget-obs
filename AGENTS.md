# Music Widget OBS — Agent Guide

## Архитектура

```
Browser Extension (MV3) → WebSocket → obs-websocket (OBS, порт из попапа, 4455 по умолчанию) → WebSocket → OBS Widget
```

Расширение раз в секунду опрашивает каждую вкладку через `navigator.mediaSession` + DOM-слайдеры, отправляет `BroadcastCustomEvent` через obs-websocket. Виджет подписан на `CustomEvent`.

`chrome.alarms` (раз в 5 секунд) держит service worker живым.

## ВАЖНО: НЕ МЕНЯТЬ (архитектурные решения)

- **Пароль OBS WebSocket — опционально.** Если в OBS включён «Включить вход в аккаунт», в попапе ставится галочка «Использовать пароль» и вводится пароль. Background проходит auth и через `SetInputSettings` прописывает порт/пароль в Custom CSS источников-виджетов (`/*mw-obs*/`), виджет читает `--obs-ws-port` и `--obs-ws-password-b64`. Пароль в CSS — base64 (не защита, просто безопасно для спецсимволов).
- **Порт OBS WebSocket** задаётся в попапе; background инжектит его в CSS источников, поэтому виджет работает на любом порту без `?port=` в URL.
- **Виджет — локальный файл**, никакого Node.js, сервера, npm. Только `widget.html` как Browser Source в OBS.
- **Никаких .exe, отдельных процессов, внешних серверов** — всё работает через браузерное расширение + obs-websocket.

## Настройка для пользователя (попап на русском)

1. Сервис → Настройки сервера WebSocket
2. Включить сервер WebSocket, порт 4455 (если включён пароль — ввести его в попапе), ОК
3. Добавить источник → Браузер → Создать новый → Локальный файл → `widget.html`

## Что расширение отправляет через BroadcastCustomEvent

```json
{
  "title": "...",
  "artist": "...",
  "album": "...",
  "thumbnail": "url",
  "state": "playing" | "paused",
  "currentTime": 123,
  "duration": 200,
  "ts": 1700000000000
}
```

Данные отправляются при каждом опросе (раз в секунду), без дедупликации. 1 msg/s через localhost — незначительная нагрузка.

## Приоритет источников медиа (content.js)

1. `navigator.mediaSession.metadata` — YouTube, Яндекс.Музыка, SoundCloud
2. DOM-селекторы Spotify: `[data-testid="context-item-info-title"]` и `[data-testid="context-item-info-artist"]`
3. Кнопка play/pause: `[data-testid="control-button-playpause"]` (Spotify) или `aria-label` «Пауза»/«Pause» / «Play»
4. Обложка: `[data-testid="cover-art-image"]` (Spotify) или `navigator.mediaSession.metadata.artwork[0]`

Spotify не отдаёт album через mediaSession, поэтому album пустой для Spotify.

## Приоритет источников тайминга (content.js)

1. Yandex.Music слайдер: `input[type="range"][aria-label="Управление таймкодом"]` — читает `valueAsNumber` / `max`
2. `<video>` / `<audio>` элементы — первый с валидной длительностью
3. `role="progressbar"` с `aria-valuemax` / `aria-valuenow`
4. `input[type="range"]` внутри `[data-testid="playback-progressbar"]` (Spotify — значение в миллисекундах)
5. Текст вида `1:23 / 4:56` через `TreeWalker`

## Очистка трека при закрытии вкладки

- `chrome.tabs.onRemoved` в `background.js`
- `beforeunload` в content.js
- `nullCount`: 3 пустых опроса подряд → `trackEnded`
- Страховочный таймаут 65 секунд в `pickAndSend()`

## WebSocket и reconnection

- Heartbeat: каждые 5 секунд (не 15!)
- При `onclose`: `ws = null`, `wsConnecting = false`
- При `onerror`: сначала проверка `ws !== sock`, потом `wsConnecting = false`
- `connect()` вызывается из `onclose`/`onerror` (немедленно), из heartbeat alarm + при старте service worker
- Если OBS выключен, каждая попытка подключения логируется в `lastError` и показывается в попапе
- Расширение само переподключается после перезапуска OBS

## Попап (popup.html + popup.js)

- **Переключатель RU/EN** — кнопка в правой части шапки
- Все строки через объект `L10N` с ключами `ru` и `en`
- Выбор языка сохраняется в `chrome.storage.local`
- Статус: просто «WebSocket: подключен» (без названия трека)
- Источник (hostname вкладки) — в той же строке, что и заголовок «Сейчас играет»
- При отключении показывает сообщение об ошибке (без таймера повтора)
- Галочка «Использовать пароль» + поле пароля (показывается при галочке); пароль хранится в `chrome.storage.local`; при смене порта/пароля — сообщение `reconnect` в background
- Секция «Вывод в текстовый источник»: сворачиваемая, компактная, формат + разделитель, выпадающий мультивыбор источников, Scroll-фильтр. Скроллбар — стандартный браузерный (15px, прозрачный трек, themed thumb), контент скроллится нативно, без `.app-scroll`. Собрана из штатных компонентов попапа: `.section-title-row`/`.section-title`/`.track-source`, `.style-dd`/`.style-options`/`.style-option`, `.settings-grid`/`.field-row`; общий chevron для `.style-dd`/`.text-details`; стандартный браузерный скроллбар (прозрачный трек, themed thumb)
- Шаги настройки OBS на русском
- В футере ссылка на GitHub репозиторий

## Вывод в текстовый источник (нативный Text-источник)

- Пользователь сам создаёт **Text (GDI+)** и настраивает шрифт/цвет/обводку/размер/рамку — расширение меняет только `.text`.
- Попап → «Вывод в текстовый источник» — **сворачиваемая** секция (закрыта по умолчанию, крупная стрелка), компактная компоновка:
  - «Вывод» + выпадающий список Text-источников с чекбоксами (мультивыбор, счётчик, «Обновить»);
  - формат-пресеты `Artist — Title` / `Title — Artist` / `Artist — Title (album)` / `Title (artist)` / «Другой…» + отдельный выбор разделителя (`—`, `·`, `|`, `/`, `•`, «Свой…» с полем);
  - плоская 2-колоночная сетка (подпись 56px / контрол), полноширинный `.style-dd` источников; без вложенного «Дополнительно»; прокрутка отдельной строкой;
  - превью строки; Scroll-фильтр и скорость (px/s) — в той же сетке.
- Background при каждом треке шлёт `SetInputSettings` `{ text }` с `overlay: true` во все выбранные источники; только при изменении текста; параллельно с виджетом (виджет-стиль не меняется).
- Scroll-фильтр `MW Scroll` (`scroll_filter`, `speed_x`, `loop`) создаётся/включается на выбранных источниках. «Limit Width» пользователь ставит под рамку — у самого Text-источника автоширины/автопрокрутки нет.
- Если у Text-источника включён **Read from file**, OBS игнорирует `.text` — галочку надо выключить.
- Несколько Text-источников — штатно: чекбоксы, все выбранные получают одну и ту же строку, невыбранные не трогаются. Один и тот же input может стоять в нескольких сценах.
- Список Text-источников кэшируется в background и авто-обновляется при переподключении к OBS — после рестарта OBS «Нет соединения» не залипает.

## Виджет

Файл `widget.html` в корне проекта — пользователь выбирает его как Local File в OBS.
`extension/preview.html` — точная копия (пути без `extension/` префикса), используется для превью в попапе.

При обновлении `widget.html` копировать его содержимое в `extension/preview.html`, убирая `extension/` из путей скриптов и CSS.

### Архитектура стилей (widget.js + styles/*.js)

Каждый стиль — полностью изолированный объект в реестре `window.__STYLES`. Не зависит от других стилей.

```
STYLES[name] = {
  init()      — создать свой DOM
  destroy()   — удалить свой DOM
  show(data)  — отрисовать трек
  showStatus(text) — показать заглушку
}
```

- `widget.js` — ядро: WebSocket, реестр `__STYLES`, утилиты (colors, marquee, tick, orient, fmt), диспетчер handleTrackData → applyStyle → STYLES[name].show(data)
- `styles/classic.js`, `compact.js`, `glass.js`, `minimal.js` — стандартные стили (вызывают `renderStandard(data, E, name)`)
- `styles/stereo.js` — кастомный стиль (свой DOM, свой рендер)

**Добавление нового стиля:** создать файл в `styles/`, добавить скрипт в `widget.html` и `preview.html`, написать 4 метода. Остальные стили не трогаются.

**Custom CSS:** если в OBS Browser Source в поле Custom CSS задать `:root { --widget-style: 'stereo' }`, виджет фиксирует этот стиль (игнорирует `_style` из попапа).

### URL-параметры
- `?mock=1` — демо-режим с тестовыми данными (Blinding Lights)
- `?preview=1` — режим превью (ожидает данные через `postMessage`, не подключается к WebSocket)
- `?port=xxx` — ручной override порта (по умолчанию 4455); штатно порт и пароль приходят из CSS-переменных `--obs-ws-port`/`--obs-ws-password-b64`, которые background прописывает в источник
- `?lang=en` — английский язык заглушки (по умолчанию ru)

### Статусы виджета

| Сценарий | Показывает |
|---|---|
| OBS выключен / auth / не тот порт | «Ожидание подключения...» |
| OBS включён, WebSocket ок, музыки нет | «Нет воспроизведения» |
| OBS включён, музыка играет | трек в стиле текущего виджета |
| OBS включён, музыка на паузе | трек с иконкой play |
| Вкладка с музыкой закрыта | ~3с → «Нет воспроизведения» |
| Расширение упало / браузер закрыт | 3с (watchdog) → «Нет воспроизведения» |

### Watchdog
- 3 секунды без данных → заглушка (останавливает `tick()`)

### Sizing (НИ В КОЕМ СЛУЧАЕ НЕ МЕНЯТЬ)
- Все размеры в `calc(vh)` — привязаны к Browser Source, не к viewport
- Ориентация: `height >= width` → vertical, иначе horizontal
- Timing sync: сервер шлёт `ts`, виджет компенсирует сетевую задержку

### Marquee
- sequential animation с generation counter (предотвращает race conditions)
- Каждый переполняющийся текст: `span` + `span` дубликат
- Duration = число символов / CPS; по умолчанию 3 символа/с, настраивается `--marquee-cps` (например, `:root{--marquee-cps:2.5}` в Custom CSS OBS). px/с — производная, масштабируется с кеглем, но симв/с стабильно.
- Цикл: 3.5s пауза → для каждого: 2.5s wait → animate → 0.5s буфер → 1.5s gap → 5s end пауза

### Color extraction
- Canvas 8×8 → сортировка пикселей по яркости
- Тёмный: 10-й перцентиль, светлый: 70-й
- Если тёмный > 90 → затемнить до 25%
- Если светлый < 80 → +120 к каждому каналу (min 255)

### Layout specs (для стандартных стилей classic/compact/glass/minimal)

#### Horizontal
| Элемент | Size | line-height |
|---|---|---|
| Title | 22vh | 1.25 |
| Artist | 14vh | 1.25 |
| Album | 14vh | 1.25 |
| Timing | 12vh | 1.25 |
| Play btn | 35vh | — |

Artwork: 28% width. Track-info: flex padding. Controls: absolute right center.

#### Vertical
| Элемент | Size | line-height |
|---|---|---|
| Title | 10vh | 1.25 |
| Artist | 6vh | 1.25 |
| Album | 4vh | 1.25 |
| Timing | 3.5vh | 1.25 |
| Play btn | 10vh | — |

Artwork: 50% height. Controls: bottom center.

## Файлы

| Файл | Назначение |
|---|---|---|
| `extension/background.js` | Service worker: опрос вкладок, WebSocket connect/send, auth, инъекция порта/пароля в Custom CSS источников-виджетов, вывод текста в Text-источники + Scroll-фильтр, хранение треков, `chrome.tabs.onRemoved`, страховочная чистка 65с |
| `extension/manifest.json` | Manifest v3, версия (`"version"`) — единственное место где меняется версия |
| `extension/popup.html` + `popup.js` | Статус, настройки порта/пароля, текст в OBS, RU/EN переключатель, шаги настройки OBS на русском, ссылка на GitHub |
| `extension/content.js` | Контент-скрипт: чтение mediaSession, DOM-тайминг, определение источников, nullCount, beforeunload |
| `extension/widget.js` | Ядро виджета: WebSocket клиент, реестр стилей, утилиты (marquee, colors, tick, orient), диспетчер |
| `extension/styles/*.js` | Стили виджета: каждый файл — самодостаточный объект с init/destroy/show/showStatus |
| `widget.html` | Главный файл для OBS (Browser Source → Local File) |
| `extension/preview.html` | Копия widget.html для превью в попапе (пути без extension/) |
| `extension/icon*.png` | Иконки расширения |
| `extension/icon_fg.png` | Foreground-иконка для попапа |
| `CHANGELOG.md` | Журнал изменений — обновлять при каждом коммите |
| `AGENTS.md` | Этот файл — инструкция для агента

## Запрещённые изменения (⚠️ НАРУШЕНИЕ = СЛОМАННЫЙ ПРОЕКТ)

1. **Не менять `vh` на `px`/`vw`** — размеры виджета привязаны к Browser Source, не к окну браузера
2. **Пароль/аутентификация — только опционально через галочку в попапе** (по прямому запросу владельца); по умолчанию выключено, без пароля поведение прежнее
3. **Не менять архитектуру** — никаких серверов, Node.js, npm run, .exe, терминала
4. **Не менять логику `showStatus()`** — показывает заглушку, останавливает таймеры, чистит watchdog
5. **Не удалять `chrome.tabs` permission** — нужен для `onRemoved`
6. **Не добавлять дедупликацию отправки** — данные шлются каждый опрос (1/с)
7. **Не менять heartbeat обратно на 60 секунд** — 5с нужно для быстрой переподписки

## Управление версиями и CHANGELOG

- Версию веду я (агент). `MAJOR.MINOR.PATCH` в `manifest.json`.
- **PATCH** — бампаю при каждом коммите.
- **MINOR** — бампаю при новых функциях.
- **MAJOR** — при релизе, с согласованием.
- **CHANGELOG.md** — веду я. Пишу для простых пользователей, без технического жаргона, без имён переменных/функций/файлов. Дата ставится только при создании релиза (до этого `unreleased`).
- При создании GitHub Release changelog берётся из CHANGELOG.md за вычетом заголовка версии.
- CHANGELOG.md коммитится в репозиторий.

## Разработка

- Редактировать файлы напрямую, перезагружать расширение в `chrome://extensions`
- Для теста виджета: открыть `widget.html?mock=1` из корня проекта в браузере (вне расширения — открывается локально как файл)
- git коммиты: без `-i`, без `--amend`, без force push
- Основная ветка разработки: `develop`

## Правила работы (CRITICAL)

1. **Если я не понял задачу — НЕ ДЕЛАТЬ НИЧЕГО. Сначала спросить.** Никаких догадок, никаких костылей, никаких «ну я подумал что…».
2. **Минимальные изменения.** Не переписывать файл целиком. Только точечные правки.
3. **Всегда предупреждать** перед тем как что-то менять, если это не очевидная мелкая правка.
