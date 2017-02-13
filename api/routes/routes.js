const service_list = require('./service_list');
const service_add = require('./service_add');
const service_del = require('./service_del');
const temp_add = require('./temp_add');
const temp_list = require('./temp_list');
const sensor_list = require('./sensor_list');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = function(app) {

 app.get('/services/list', service_list);
 app.post('/services/add', jsonParser, service_add);
 app.post('/services/delete', jsonParser, service_del);
 app.post('/temp/add', jsonParser, temp_add);
 app.get('/temp/list', temp_list);
 app.get('/temp/:sensorId/list', temp_list);
 app.get('/sensor/list', sensor_list);
}
