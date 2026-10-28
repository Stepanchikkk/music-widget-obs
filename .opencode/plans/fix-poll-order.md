# Fix: poll() must check tabs before WebSocket

## Root cause

In old version (4.0, working), `poll()` did:

```
tabs = await chrome.tabs.query({})     ← always, first
... check tabs ...
fetch(API_URL, ...)                      ← send to server
setTimeout(poll, 1000)
```

In new version (5.0, broken), `poll()` does:

```
result = await connectWebSocket()        ← BLOCKS until WS is ready
if (result.connected) {
  tabs = await chrome.tabs.query({})     ← only if WS connected
  ... check tabs ...
}
```

**If WebSocket takes time to connect (or reconnects), tab checking is blocked entirely.**  
Music is only detected after WebSocket connects. This makes detection feel unreliable.

## Fix

Restore the old pattern: **always check tabs first**, then try to send via WebSocket.

## Changes to `extension/background.js`

### 1. Add `wsConnecting` guard
```js
let wsConnecting = false;
```
Prevents creating multiple WebSocket connections simultaneously when `poll()` fires every 1s.

### 2. `connectWebSocket()` — add guard + set flag
At top of function:
```js
if (wsConnecting) { resolve({ connected: false }); return; }
wsConnecting = true;
```
Reset `wsConnecting = false` in:
- `disconnectWebSocket()` (always)
- `ws.onclose` (calls disconnectWebSocket)
- `ws.onerror` (calls disconnectWebSocket after cleanup)
- timeout handler (calls disconnectWebSocket)
- `wsConnectResolve` exit paths (auth_password_required, auth_compute_error, send_failed)

### 3. `poll()` — rewrite

Old body:
```js
const result = await connectWebSocket();
if (result.connected) {
  const tabs = await chrome.tabs.query({});
  // ... check tabs only if connected ...
}
```

New body:
```js
// Step 1: Always check tabs (like old version)
const tabs = await chrome.tabs.query({});
// ... find bestTrack, update currentTrackData, lastSentKey, lastPollInfo ...

// Step 2: Send via WebSocket if we have data
if (currentTrackData && lastSentKey) {
  sendTrackEvent(currentTrackData); // buffers in pendingQueue if not connected
}

// Step 3: Ensure WebSocket connection (fire-and-forget)
if (!ws || (ws.readyState !== WebSocket.OPEN && ws.readyState !== WebSocket.CONNECTING)) {
  connectWebSocket().catch(() => {});
}
```

Then at the end of `poll()`:
```js
pollTimer = setTimeout(poll, 1000);
```

### 4. Remove `startPolling()` and `stopPolling()`
Replace with inline `setTimeout(poll, 1000)` at end of `poll()`.

### 5. Update alarm handler
```js
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'heartbeat' && !pollTimer) {
    poll();
  }
});
```

### 6. Update reconnect handler
```js
if (msg.type === 'reconnect') {
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
  disconnectWebSocket();
  poll();
  sendResponse({ ok: true });
  return true;
}
```

## Why this fixes the issue

- Tab checking now runs **every 1 second** regardless of WebSocket state
- Music metadata is polled immediately on extension start
- `sendTrackEvent()` buffers data in `pendingQueue` when WebSocket is not connected
- When WebSocket eventually connects, `pendingQueue` is flushed on Identified (op:2)
- `wsConnecting` guard prevents creating a new WebSocket every second while one is already connecting

## Files to change

- `extension/background.js` — rewrite `poll()`, add `wsConnecting`, remove `startPolling/stopPolling`
- No other files need changes
