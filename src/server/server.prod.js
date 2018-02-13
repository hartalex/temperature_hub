import path from 'path'
const cache = require('express-cache-headers')
var expressWinston = require('express-winston');
var winston = require('winston');
var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
var fs = require('fs')
var https = require('https')
var http = require('http')
var forceSsl = require('express-force-ssl')
var key = fs.readFileSync('/etc/ssl/private/ssl-hub.hartcode.com.key')
var cert = fs.readFileSync( '/etc/ssl/certs/ssl-hub.hartcode.com.crt' )
var options = {
	key: key,
	cert: cert 
}
const app = express()
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      msg: "HTTP {{req.method}} {{req.url}}",
      colorize: true
    })
  ]
}))

app.use(forceSsl)
app.set('view engine', 'ejs')

app.use(cache(300))
apiRoutes(app)
webRoutes(app)
app.use('/img',cache(3600),express.static(path.join(__dirname, '/../client/img')))
app.use('/js', cache(0), express.static(path.join(__dirname, '/../client/js')))

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json:true,
      colorize: true
    })
  ]
}))
https.createServer(options, app).listen(443)

http.createServer(app).listen(80)
