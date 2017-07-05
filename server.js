var express = require('express')
var apiRoutes = require('../api/routes/routes')
var greenlock = require('./greenlock')
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'
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

greenlock(app).listen(80, 443)
