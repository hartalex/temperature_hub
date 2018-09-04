var path = require('path')
const cache = require('express-cache-headers')
var expressWinston = require('express-winston')
var winston = require('winston')
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
var fs = require('fs')
var https = require('https')
var http = require('http')
var certname = process.env.CERT_NAME
var options = {}
if (certname) {
  console.log('CertName Found, reading certs for ${certname}')
  let key = fs.readFileSync(`/etc/ssl/private/${certname}.key`)
  let cert = fs.readFileSync(`/etc/ssl/certs/${certname}.crt`)
  options = {
    key,
    cert
  }
}

const logging = winston.createLogger({
  transports: [new winston.transports.Console({ timestamp: true })]
})

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

logging.info('Setting Up Routes')
app.use(cache(300))
apiRoutes(app)
  .then(function() {
    webRoutes(app)
    app.use(
      '/static',
      cache(3600),
      express.static(path.join(__dirname, '../../build/static'))
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
    if (certname) {
      https.createServer(options, app).listen(3000)
    } else {
      http.createServer(app).listen(3000)
    }
  })
  .catch(function(err) {
    logging.log('error', 'server.prod.js', err)
  })
