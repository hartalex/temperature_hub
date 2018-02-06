const info = require('./info')
const bodyParser = require('body-parser')
const routeCache = require('route-cache')
const routeCache1hr = routeCache.cacheSeconds(3600)
const routeCache5m = routeCache.cacheSeconds(300)
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
  app.get('/services/list', routeCache1hr, serviceList)
  app.post('/services/add', jsonParser, serviceAdd)
  app.post('/services/delete', jsonParser, serviceDel)

  // temp and door
  app.post('/data/add', jsonParser, dataAdd)

  // temperatures
  app.get('/temp/list', tempList)
  app.get('/temp/graph', tempGraph)
  app.get('/temp/:duration/graph', tempGraph)
  app.get('/temp/list/:sensorId', tempList)
  app.get('/temp/current', routeCache5m, tempCurrent)
  app.get('/temp/sensor/list', routeCache1hr, tempSensorList)

  // sensors
  app.post('/sensor/add', jsonParser, sensorAdd)

  // doors
  app.get('/door/list', doorList)
  app.get('/door/:duration/graph', doorGraph)
  app.get('/door/list/:sensorId', doorList)
  app.get('/door/sensor/list', routeCache1hr, doorSensorList)

  // menu
  app.post('/menu/add', jsonParser, menuAdd)
  app.get('/menu/list/:date', routeCache1hr, menuList)

  // moon
  app.get('/moonPhases', routeCache1hr, moonPhases)

  // forecast
  app.get('/forecast', routeCache1hr, forecast)

  // weather
  app.get('/weather', routeCache1hr, weather)

  // memory
  app.post('/memory/add', jsonParser, memoryAdd)
  app.get('/memory/list/:date', routeCache1hr, memoryList)

  app.get('/info', info)

}
