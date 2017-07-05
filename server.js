var express = require('express')
var apiRoutes = require('../api/routes/routes')
var greenlock = require('./greenlock')
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config.js'
const port = process.env.PORT || 443
const app = express()
const http = express()

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    quiet: false,
    noInfo: false,
    stats: {
      colors: true
    }
  }))

  app.use(webpackHotMiddleware(compiler))
}
app.use(greenlock.middleware())
app.use('/', express.static('web'))
apiRoutes(app)
app.listen(port)

http.use('/', greenlock.middleware())
http.listen(80)
