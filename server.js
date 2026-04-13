const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9876;

const widgetPath = path.join(__dirname, 'widget.html');
let widgetHTML = null;

// Текущий трек (обновляется расширением)
let currentTrack = { error: 'no_music' };

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Виджет
  if ((req.url === '/' || req.url.startsWith('/?') || req.url === '/widget' || req.url.startsWith('/widget?')) && req.method === 'GET') {
    if (!widgetHTML) {
      widgetHTML = fs.readFileSync(widgetPath, 'utf-8');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(widgetHTML);
    return;
  }

  // GET /api/track — виджет забирает трек
  if (req.url === '/api/track' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(currentTrack));
    return;
  }

  // POST /api/update — расширение отправляет трек
  if (req.url === '/api/update' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // Нормализуем поля
        currentTrack = {
          title: data.title,
          artist: data.artist,
          album: data.album,
          thumbnail: data.thumbnail || data.artwork || '',
          state: data.state || 'playing',
          currentTime: data.currentTime || 0,
          duration: data.duration || 0,
          ts: data.ts || Date.now()
        };
        const t = currentTrack.title || '?';
        const a = currentTrack.artist || '?';
        const s = currentTrack.state || '?';
        console.log(`🎵 ${new Date().toLocaleTimeString()} → ${a} - ${t} [${s}]`);
      } catch (e) {
        currentTrack = { error: 'parse_error' };
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║       🎵 Music Widget Server запущен!           ║
║                                                  ║
║  📍 Виджет: http://127.0.0.1:${PORT}/              ║
║  📡 API:    http://127.0.0.1:${PORT}/api/track      ║
║                                                  ║
║  ✅ В OBS: Browser Source → http://127.0.0.1:${PORT}/  ║
╚══════════════════════════════════════════════════╝
  `);
});
