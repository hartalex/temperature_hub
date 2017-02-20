const cors = require('cors')

const serviceList = require('./service_list')
const serviceAdd = require('./service_add')
const serviceDel = require('./service_del')
const tempAdd = require('./temp_add')
const tempList = require('./temp_list')
const tempGraph = require('./temp_graph')
const sensorList = require('./sensor_list')
const sensorAdd = require('./sensor_add')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

module.exports = function (app) {
  // services
  app.get('/services/list', serviceList)
  app.post('/services/add', jsonParser, serviceAdd)
  app.post('/services/delete', jsonParser, serviceDel)

  // temperatures
  app.post('/temp/add', jsonParser, tempAdd)
  app.get('/temp/list', tempList)
  app.get('/temp/graph', cors(), tempGraph)
  app.get('/temp/:duration/graph', cors(), tempGraph)
  app.get('/temp/:sensorId/list', cors(), tempList)

  // sensors
  app.get('/sensor/list', cors(), sensorList)
  app.post('/sensor/add', jsonParser, sensorAdd)
}
