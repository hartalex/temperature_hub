const addData2Fields = require('../addData2Fields')
module.exports = function (req, res, done) {
  return addData2Fields('services', 'url', 'name', 'Service')(req, res, done)
}
