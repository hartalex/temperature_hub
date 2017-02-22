const data = require('../data/data')
const db = require('../db/mongodb')

module.exports = function (req, res) {
  data.db = db
  console.log(req.body)
  data.dataAdd(req.body).then(function (output) {
    if (output.result === 'fail') {
      res.status(500)
    } else {
      res.status(200)
    }
    console.log('output')
    console.log(output)
    res.json(output)
  }).catch(function (err) {
    res.json({result: 'fail', reason: err})
  })
}
