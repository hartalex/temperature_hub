var realData = require('../data/data')
var routeAdd = require('./route_add')

module.exports = function (req, res, done) {
  var mydata = req.data
  if (typeof mydata === 'undefined') {
    mydata = realData
  }
  routeAdd(mydata.menuAdd(req.body), res, done)
}
