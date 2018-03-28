import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../../webpack.config'
import path from 'path'
var expressWinston = require('express-winston');
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
const logging = require('winston')
const app = express()

app.set('view engine', 'ejs')

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

app.use(expressWinston.logger({
  transports: [
    new logging.transports.Console({
      msg: "HTTP {{req.method}} {{req.url}}",
      colorize: true
    })
  ]
}))

apiRoutes(app).then(function() {
webRoutes(app)

app.use(express.static(path.join(__dirname, '/../client/')))

app.use(expressWinston.errorLogger({
  transports: [
    new logging.transports.Console({
      json:true,
      colorize: true
    })
  ]
}))
app.listen(8080)
}).catch(function(err) {
  logging.log('error','server.js', err)
})
