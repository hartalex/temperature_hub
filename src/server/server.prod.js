import path from 'path'

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

app.use(forceSsl)
app.set('view engine', 'ejs')

apiRoutes(app)
webRoutes(app)
app.use(express.static(path.join(__dirname, '/../client/')))

https.createServer(options, app).listen(443)

http.createServer(app).listen(80)
