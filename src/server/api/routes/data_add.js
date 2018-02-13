const mongodb = require('../db/mongodb')()
var realData = require('../data/data')(mongodb)
var routeAdd = require('./route_add')

module.exports = function(req, res, done) {
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData
  }
  var dataAddFunc = null
  if (req.body && 'id' in req.body) {
    dataAddFunc = mydata.tempAdd(req.body)
  } else {
    dataAddFunc = mydata.doorAdd(req.body)
  }
  routeAdd(dataAddFunc, req, res, done)
}
