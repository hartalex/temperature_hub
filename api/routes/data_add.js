const data = require('../data/data')

module.exports = function (req, res) {
  var output = {}
  data.init(require('../db/mongodb'))
  data.dataAdd(req.body, output)
  if (output.result === 'fail') {
    res.status(500)
  } else {
    res.status(200)
  }
  res.json(output)
}
