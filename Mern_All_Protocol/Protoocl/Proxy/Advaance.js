
// ⚡ 2. Advanced Proxy with Middleware (Using Express + http-proxy-middleware)



// npm install express http-proxy-middleware



const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Add proxy middleware
app.use('/api', createProxyMiddleware({
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq(proxyReq, req, res) {
    console.log('Proxying request:', req.url);
  }
}));

app.listen(3000, () => {
  console.log('Proxy running on http://localhost:3000');
});





// http://localhost:3000/api/posts → https://jsonplaceholder.typicode.com/posts

//🔐 3. Adding Features (Headers, Auth, CORS, Logging)

app.use('/api', createProxyMiddleware({
  target: 'http://localhost:9000',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq(proxyReq, req) {
    // Add custom header
    proxyReq.setHeader('x-custom-header', 'ProxyHeader');
  },
  onProxyRes(proxyRes, req, res) {
    console.log(`[${req.method}] ${req.originalUrl} -> ${proxyRes.statusCode}`);
  },
  onError(err, req, res) {
    res.status(500).send('Proxy error');
  }
}));