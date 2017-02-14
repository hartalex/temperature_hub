const cors = require('cors');

const service_list = require('./service_list');
const service_add = require('./service_add');
const service_del = require('./service_del');
const temp_add = require('./temp_add');
const temp_list = require('./temp_list');
const temp_graph = require('./temp_graph');
const sensor_list = require('./sensor_list');
const sensor_add = require('./sensor_add');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = function(app) {

 // services
 app.get('/services/list', service_list);
 app.post('/services/add', jsonParser, service_add);
 app.post('/services/delete', jsonParser, service_del);
 
 // temperatures 
 app.post('/temp/add', jsonParser, temp_add);
 app.get('/temp/list', temp_list);
 app.get('/temp/graph', cors(), temp_graph);
 app.get('/temp/:sensorId/list', cors(), temp_list);

 // sensors
 app.get('/sensor/list', cors(), sensor_list);
 app.post('/sensor/add', jsonParser, sensor_add);
}
