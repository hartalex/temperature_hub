const data = require('../data/data')
const db = require('../db/mongodb')

module.exports = function (req, res) {
  data.db = db
  data.dataAdd(req.body).then(function (output) {
    if (output.result === 'fail') {
      res.status(500)
    } else {
      res.status(200)
    }
    res.json(output)
  }).catch(function (err) {
    res.json({result: 'fail', reason: err})
  })
}
