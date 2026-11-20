# Chrome Web Store — Music Widget OBS

## Name
Music Widget OBS

## Short description
Shows the current track from your browser in OBS via obs-websocket.

## Detailed description
Music Widget OBS displays the currently playing track from your browser as an overlay in OBS Studio. It works with YouTube, Yandex Music, Spotify, SoundCloud and other sites that expose the Media Session API.

How it works: the extension reads the track metadata from the browser and sends it over the local obs-websocket server to a widget or a native Text source in OBS. No account, no server, no cloud — everything stays on your machine.

Features:
- 7 widget styles: classic, compact, glass, glass-compact, minimal, stereo, fallout
- optional text output to native OBS Text (GDI+) sources
- optional OBS WebSocket password and custom port
- RU/EN interface

Setup:
1. Install the extension.
2. Enable the WebSocket server in OBS (Tools → WebSocket Server Settings, port 4455).
3. Add a Browser Source in OBS pointing to the widget (local file or the hosted URL).
4. Play music in the browser.

## Category
Productivity

## Languages
Russian, English

## Single purpose
Show the currently playing browser media in OBS through the local obs-websocket server.

## Permission justifications
- `host_permissions: <all_urls>` / content script on all sites: the extension must read the Media Session API and DOM on whichever site is playing media; the user chooses the site by playing music there.
- `tabs`: to identify the tab that is playing and to clear the overlay when that tab closes.
- `storage`: to save the user's settings (port, password, style, text output).
- `alarms`: to keep the service worker alive so the local WebSocket heartbeat and reconnection keep working.
- `scripting`: to inject the content script when needed.

## Data usage
- No data is collected or sent to remote servers.
- Track metadata is sent only to the local OBS WebSocket.
- Settings are stored locally in chrome.storage.local.

## Privacy policy
See PRIVACY.md in the repository.

## Screenshots (1280×800)
1. Popup with widget preview and styles.
2. Widget in OBS (classic, horizontal).
3. Text output in OBS.

## Promotional images
- Small promo: 440×280.
- Marquee: 1400×560.
