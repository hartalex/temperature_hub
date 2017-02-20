const express = require('express')
const temperatureGraph = require('./temperatureGraph')
const cors = require('cors')
const port = process.env.PORT || 80
const app = express()

app.get('/', cors(), temperatureGraph)
app.get('/:duration', cors(), temperatureGraph)

app.listen(port)
