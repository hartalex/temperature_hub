const cors = require('cors')
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
const moonPhases = require('./moonPhases')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

module.exports = function (app) {
  // services
  app.get('/services/list', cors(), serviceList)
  app.post('/services/add', jsonParser, serviceAdd)
  app.post('/services/delete', jsonParser, serviceDel)

  // temp and door
  app.post('/data/add', jsonParser, dataAdd)

  // temperatures
  app.get('/temp/list', cors(), tempList)
  app.get('/temp/graph', cors(), tempGraph)
  app.get('/temp/:duration/graph', cors(), tempGraph)
  app.get('/temp/list/:sensorId', cors(), tempList)
  app.get('/temp/current', cors(), tempCurrent)
  app.get('/temp/sensor/list', cors(), tempSensorList)

  // sensors
  app.post('/sensor/add', jsonParser, sensorAdd)

  // doors
  app.get('/door/list', cors(), doorList)
  app.get('/door/:duration/graph', cors(), doorGraph)
  app.get('/door/list/:sensorId', cors(), doorList)
  app.get('/door/sensor/list', cors(), doorSensorList)

  // menu
  app.post('/menu/add', jsonParser, menuAdd)
  app.get('/menu/list/:date', cors(), menuList)

  // moon
  app.get('/moonPhases', cors(), moonPhases)
}
