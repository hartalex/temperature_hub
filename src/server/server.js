import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../../webpack.config'
import path from 'path'
var expressWinston = require('express-winston')
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
const winston = require('winston')
const app = express()

const logging = new winston.Logger({
  transports: [new winston.transports.Console({ timestamp: true })]
})

app.set('view engine', 'ejs')

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config)
  app.use(
    webpackDevMiddleware(compiler, {
      quiet: false,
      noInfo: false,
      stats: {
        colors: true
      }
    })
  )

  app.use(webpackHotMiddleware(compiler))
}

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        msg: 'HTTP {{req.method}} {{req.url}}',
        colorize: true,
        timestamp: true
      })
    ]
  })
)

apiRoutes(app)
  .then(function() {
    webRoutes(app)
    app.use(express.static(path.join(__dirname, '/../client/')))
    app.use(
      expressWinston.errorLogger({
        transports: [
          new winston.transports.Console({
            json: true,
            colorize: true,
            timestamp: true
          })
        ]
      })
    )
    app.listen(8080)
  })
  .catch(function(err) {
    logging.log('error', 'server.js', err)
  })
