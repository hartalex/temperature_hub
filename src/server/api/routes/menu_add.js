const mongodb = require('../db/mongodb')()
var realData = require('../data/data')(mongodb)
var routeAddImport = require('./route_add')

module.exports = function (req, res, done) {
  var routeAdd = routeAddImport(undefined, req.slack)
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData
  }
  routeAdd(mydata.menuAdd(req.body), req, res, done)
}
