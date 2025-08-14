// npm install http-proxy


const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create your own server to handle incoming requests
const server = http.createServer((req, res) => {
  // Forward the request to the target server
  proxy.web(req, res, { target: 'http://localhost:9000' });
});

server.listen(8000, () => {
  console.log('Proxy server running on http://localhost:8000');
});
