const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  // Handle CORS proxy requests: /proxy?url=...
  if (req.url.startsWith('/proxy?')) {
    const params = new URL(req.url, `http://localhost:${PORT}`);
    const targetUrl = params.searchParams.get('url');
    
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Missing url parameter');
      return;
    }

    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Free-Fallback, x-goog-api-key',
        'Access-Control-Max-Age': '86400',
      });
      res.end();
      return;
    }

    // Forward the request
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      body = Buffer.concat(body);
      
      const targetUrlObj = new URL(targetUrl);
      const options = {
        hostname: targetUrlObj.hostname,
        port: targetUrlObj.port || (targetUrlObj.protocol === 'https:' ? 443 : 80),
        path: targetUrlObj.pathname + targetUrlObj.search,
        method: req.method,
        headers: { ...req.headers },
      };
      
      // Clean up proxy headers
      delete options.headers['host'];
      delete options.headers['origin'];
      delete options.headers['referer'];
      options.headers['host'] = targetUrlObj.host;

      const proto = targetUrlObj.protocol === 'https:' ? require('https') : http;
      
      const proxyReq = proto.request(options, (proxyRes) => {
        const responseHeaders = { ...proxyRes.headers };
        responseHeaders['access-control-allow-origin'] = '*';
        responseHeaders['access-control-allow-headers'] = 'Content-Type, Authorization, X-Free-Fallback, x-goog-api-key';
        
        res.writeHead(proxyRes.statusCode, responseHeaders);
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (e) => {
        console.error('[Proxy Error]', e.message);
        res.writeHead(502, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Proxy error: ' + e.message);
      });

      if (body.length > 0) {
        proxyReq.write(body);
      }
      proxyReq.end();
    });
    return;
  }

  // Static file server
  let filePath = req.url.split('?')[0];
  if (filePath === '/') filePath = '/index.html';
  
  const fullPath = path.join(ROOT, filePath);
  
  // Security: prevent directory traversal
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found: ' + filePath);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      }
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Mihnati dev server running at:\n`);
  console.log(`    http://localhost:${PORT}/\n`);
  console.log(`  CORS proxy available at:`);
  console.log(`    http://localhost:${PORT}/proxy?url=<target>\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
