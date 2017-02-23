var realData = require('../data/data')

module.exports = function (req, res, data, done) {
  var mydata = data
  if (typeof mydata === 'undefined') {
    mydata = realData
  }
  var dataAdd = mydata.dataAdd(req.body)
  dataAdd.then(function (output) {
    res.status(200)
    res.json(output)
    if (done && typeof done === 'function') {
      done()
    }
  }).catch(function (err) {
    res.status(500)
    res.json({result: 'fail', reason: err})
    if (done && typeof done === 'function') {
      done()
    }
  })
}
