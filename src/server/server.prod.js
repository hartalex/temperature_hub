var path = require('path')
const cache = require('express-cache-headers')
var expressWinston = require('express-winston')
var winston = require('winston')
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
var fs = require('fs')
var forceSsl = require('express-force-ssl')
var https = require('https')
var http = require('http')
var certname = process.env.CERT_NAME
var cors = require('cors')
var options = {}
if (certname) {
  console.log(`CertName Found, reading certs for ${certname}`)
  let key = fs.readFileSync(`/etc/ssl/private/${certname}.key`)
  let cert = fs.readFileSync(`/etc/ssl/certs/${certname}.crt`)
  options = {
    key,
    cert
  }
}
var corsOptions = {
  origin: ["https://hub.test.hartcode.com", "https://homehub.cloud.test.hartcode.com")
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
app.use(cors(corsOptions))
if (certname) {
  app.use(forceSsl)
}
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
      https.createServer(options, app).listen(443)
    }
    http.createServer(app).listen(80)
  })
  .catch(function(err) {
    logging.log('error', 'server.prod.js', err)
  })
