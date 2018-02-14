const mongodb = require('../db/mongodb')()
var realData = require('../data/data')
var routeAddImport = require('./route_add')

module.exports = function(req, res, done) {
  var routeAdd = routeAddImport(undefined, req.slack)
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData(mongodb, req.db)
  }
  var dataAddFunc = null
  if (req.body && 'id' in req.body) {
    dataAddFunc = mydata.tempAdd(req.body)
  } else {
    dataAddFunc = mydata.doorAdd(req.body)
  }
  routeAdd(dataAddFunc, req, res, done)
}
