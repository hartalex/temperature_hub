var path = require('path')
const cache = require('express-cache-headers')
var expressWinston = require('express-winston')
var winston = require('winston')
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
var fs = require('fs')
var https = require('https')
var key = fs.readFileSync('/etc/ssl/private/ssl-hub.hartcode.com.key')
var cert = fs.readFileSync('/etc/ssl/certs/ssl-hub.hartcode.com.crt')
const logging = winston.createLogger({
  transports: [new winston.transports.Console({ timestamp: true })]
})

var options = {
  key: key,
  cert: cert
}
const app = express()
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
apiRoutes(app)
  .then(function() {
    webRoutes(app)
    app.use(
      '/static',
      cache(3600),
      express.static(path.join(__dirname, '/build/static'))
    )

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
    https.createServer(options, app).listen(3000)
  })
  .catch(function(err) {
    logging.log('error', 'server.prod.js', err)
  })
