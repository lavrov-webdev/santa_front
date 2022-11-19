const express = require('express')
const path = require('path');
const proxy = require('http-proxy-middleware')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/dist'));

const apiProxy = proxy.createProxyMiddleware('/api', {
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
})
app.use('/api', apiProxy)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(port, () => {
  console.log(`Server listen port ${port}`)
})
