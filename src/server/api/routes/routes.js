const info = require('./info')
const cache = require('express-cache-headers')
const bodyParser = require('body-parser')
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
const moonPhases = require('./moon_phases')
const forecast = require('./forecast')
const weather = require('./weather')
const memoryAdd = require('./memory_add')
const memoryList = require('./memory_list')

const jsonParser = bodyParser.json()

module.exports = function (app) {
  // services
  app.get('/services/list', cache(3600),  serviceList)
  app.post('/services/add', jsonParser, serviceAdd)
  app.post('/services/delete', jsonParser, serviceDel)

  // temp and door
  app.post('/data/add', jsonParser, dataAdd)

  // temperatures
  app.get('/temp/list', tempList)
  app.get('/temp/graph', tempGraph)
  app.get('/temp/:duration/graph', tempGraph)
  app.get('/temp/list/:sensorId',  tempList)
  app.get('/temp/current',  tempCurrent)
  app.get('/temp/sensor/list', cache(3600), tempSensorList)

  // sensors
  app.post('/sensor/add', jsonParser, sensorAdd)

  // doors
  app.get('/door/list', doorList)
  app.get('/door/:duration/graph', doorGraph)
  app.get('/door/list/:sensorId', doorList)
  app.get('/door/sensor/list', cache(3600), doorSensorList)

  // menu
  app.post('/menu/add', jsonParser, menuAdd)
  app.get('/menu/list/:date', cache(3600), menuList)

  // moon
  app.get('/moonPhases', cache(3600), moonPhases)

  // forecast
  app.get('/forecast', forecast)

  // weather
  app.get('/weather', weather)

  // memory
  app.post('/memory/add', jsonParser, memoryAdd)
  app.get('/memory/list/:date', cache(3600), memoryList)

  app.get('/info', info)

}
