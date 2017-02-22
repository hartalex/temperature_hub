const data = require('../data/data').init(require('../db/mongodb'))

module.exports = function (req, res) {
  var output = {}
  data.dataAdd(req.body, output)
  if (output.result === 'fail') {
    res.status(500)
  } else {
    res.status(200)
  }
  console.log(output)
  res.json(output)
}
