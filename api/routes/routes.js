const serviceList = require('./service_list')
const serviceAdd = require('./service_add')
const serviceDel = require('./service_del')
const dataAdd = require('./data_add')
const tempList = require('./temp_list')
const tempCurrent = require('./temp_current')
const tempGraph = require('./temp_graph')
const tempSensorList = require('./temp_sensor_list')
const sensorAdd = require('./sensor_add')
const doorList = require('./door_list')
const doorGraph = require('./door_graph')
const doorSensorList = require('./door_sensor_list')
const menuAdd = require('./menu_add')
const menuList = require('./menu_list')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

module.exports = function (app) {
  // services
  app.get('/services/list', serviceList)
  app.post('/services/add', jsonParser, serviceAdd)
  app.post('/services/delete', jsonParser, serviceDel)

  // temp and door
  app.post('/data/add', jsonParser, dataAdd)

  // temperatures
  app.get('/temp/list', tempList)
  app.get('/temp/graph', tempGraph)
  app.get('/temp/:duration/graph', tempGraph)
  app.get('/temp/list/:sensorId', tempList)
  app.get('/temp/current', tempCurrent)
  app.get('/temp/sensor/list', tempSensorList)

  // sensors
  app.post('/sensor/add', jsonParser, sensorAdd)

  // doors
  app.get('/door/list', doorList)
  app.get('/door/:duration/graph', doorGraph)
  app.get('/door/list/:sensorId', doorList)
  app.get('/door/sensor/list', doorSensorList)

  // menu
  app.post('/menu/add', jsonParser, menuAdd)
  app.get('/menu/list/:date', menuList)
}
