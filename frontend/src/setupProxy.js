const { createProxyMiddleware } = require('http-proxy-middleware')

const backendProxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
})

module.exports = function (app) {
  app.use('/api', backendProxyMiddleware)
}
