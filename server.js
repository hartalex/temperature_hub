var express = require('express')
var apiRoutes = require('../api/routes/routes')
var cors = require('cors')
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'
const port = process.env.PORT || 80
const app = express()

var whitelist = ['http://hub.hartcode.com', 'https://gateway.zscaler.net']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
  }
}

app.use(cors(corsOptions))

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

app.listen(port)
