var realData = require('../data/data')

module.exports = function(req, res, done) {
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData
  }
  var dataAddFunc
  if (req.body && 'id' in req.body) {
    dataAddFunc = mydata.tempAdd(req.body)
  } else {
    dataAddFunc = mydata.doorAdd(req.body)
  }
  dataAddFunc.then(function(output) {
    res.status(200)
    res.json(output)
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  }).catch(function(err) {
    res.status(500)
    res.json({
      result: 'fail',
      reason: err
    })
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  })
}