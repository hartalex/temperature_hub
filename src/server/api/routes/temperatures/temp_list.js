const jsonResponsePromise = require('../../../jsonResponsePromise')
const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)

module.exports = function(req, res, done) {
  // Use connect method to connect to the Server
  var dbobj = req.db

  return new Promise(function(resolve, reject) {
    var query = {}
    if ('sensorId' in req.params) {
      query = {
        sensorId: req.params.sensorId
      }
    }
    db.queryData(dbobj, query, 'temperatures', function(err, temps) {
      if (err) {
        throw err
      }
      for (var i = 0; i < temps.length; i++) {
        delete temps[i]._id
      }
      resolve(temps)
    })
  })
    .then(jsonResponsePromise(res, done))
    .catch(errorHandler(req, res, done))
}
