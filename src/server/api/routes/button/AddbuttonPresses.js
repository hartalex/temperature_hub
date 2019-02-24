const mongodb = require('../../db/mongodb')()
import { init } from '../../data/data'
var routeAddImport = require('../route_add')

module.exports = function (req, res, done) {
  var routeAdd = routeAddImport(undefined, req.slack)
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = init(mongodb, req.db)
  }
  routeAdd(mydata.buttonPress(req.body), req, res, done)
}
