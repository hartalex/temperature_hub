const addData2Fields = require('./addData2Fields')
module.exports = function (req, res, done) {
  return addData2Fields('sensors', 'sensorId',  'name',  'Sensor')(req, res, done)
}
