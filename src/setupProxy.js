const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/KAPP_INFOSHARE',
        createProxyMiddleware({
            target: 'http://192.168.4.186',
            changeOrigin: true,
        })
    );
};
