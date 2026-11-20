# Privacy Policy — Music Widget OBS

## What the extension reads

- Currently playing media metadata from the active tab: title, artist, album, artwork URL, playback state, current time and duration.
- The tab hostname (to show which site is playing).
- The user's settings: OBS WebSocket port and password, widget style, text output settings.

## How the data is used

- Sent locally to OBS through obs-websocket (default `ws://127.0.0.1:4455`).
- The text output is written to the selected OBS Text sources through the same local WebSocket.
- Nothing is sent to any remote server. No analytics, no tracking, no advertising.

## Storage

- Settings are stored in `chrome.storage.local` on the user's machine.
- The OBS WebSocket password is stored locally and injected into the OBS source's Custom CSS as base64; it never leaves the machine.

## Permissions

- `host_permissions: <all_urls>` and the content script — to read `mediaSession` and the DOM on any site that plays media.
- `tabs` — to know which tab is playing and to clear the track when the tab closes.
- `storage` — to save settings.
- `alarms` — to keep the service worker alive for the WebSocket heartbeat.
- `scripting` — to inject the content script on demand.

## Third parties

- No third-party services. The widget is a local HTML file or a static page (GitHub Pages); it connects only to the local OBS WebSocket.

## Contact

- https://github.com/Stepanchikkk/music-widget-obs
