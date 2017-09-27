var express = require('express')
var apiRoutes = require('./api/routes/routes')
var webRoutes = require('./client/routes')
const app = express()

app.set('view engine', 'ejs')

apiRoutes(app)
webRoutes(app)
app.listen(80)
