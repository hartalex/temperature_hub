const mongodb = require('../../db/mongodb')()
var realData = require('../../data/data')
var routeAddImport = require('../route_add')

module.exports = function (req, res, done) {
  var routeAdd = routeAddImport(undefined, req.slack)
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData(mongodb, req.db)
  }
  routeAdd(mydata.menuAdd(req.body), req, res, done)
}
