import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'
var express = require('express')
var apiRoutes = require('../api/routes/routes')
var greenlock = require('./greenlock')
const app = express()

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
app.use('/', express.static('web'))
apiRoutes(app)

var lex = greenlock()

// redirect http to https
require('http').createServer(lex.middleware(require('redirect-https')())).listen(80)

// serve app on https
require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443)
