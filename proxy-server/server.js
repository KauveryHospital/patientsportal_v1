const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/KAPP_INFOSHARE/api',
    createProxyMiddleware({
        target: 'http://192.168.4.186',
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        }
    })
);

const port = 3001;
app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
