import path from 'path'
const cache = require('express-cache-headers')
const expressWinston = require('express-winston')
const winston = require('winston')
const express = require('express')
const webRoutes = require('./client/routes')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.dev.config')

const log = new winston.Logger({
  transports: [new winston.transports.Console({ timestamp: true })]
})

const port = 8080

const app = express()

app.set('view engine', 'ejs')

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig)
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

app.use(cache(300))
webRoutes(app)

app.use(
  '/img',
  cache(3600),
  express.static(path.join(__dirname, '/../client/img'))
)
app.use('/js', cache(0), express.static(path.join(__dirname, '/../client/js')))

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
log.info(`Starting server on http://localhost:${port}`)
app.listen(port)
