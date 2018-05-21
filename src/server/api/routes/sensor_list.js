import jsonResponsePromise from '../../jsonResponsePromise'
const db = require('../db/mongodb')()
const config = require('../../config')
const slack = require('../data/slack')(config.slackUrl)
const errorHandler = require('./errorHandler')(slack)

module.exports = function(key, collection) {
  return (req, res, done) => {
    var dbobj = req.db
    // Use connect method to connect to the Server
    return new Promise(function (resolve, reject) {
      db.querydistinctData(dbobj, 'sensorId', 'temperatures', function (err, data) {
        if (err) { throw err; }
        db.queryData(dbobj, {}, 'sensors', function (err, sensors) {
          if (err) { throw err; }
          var array = []
          for (var i = 0; i < data.length; i++) {
            var obj = { sensorId: data[i] }
            for (var s = 0; s < sensors.length; s++) {
              if (data[i] === sensors[s].sensorId) {
                obj.name = sensors[s].name
              }
            }
            array.push(obj)
          }
          resolve(array)
        })
      })
    }).then(jsonResponsePromise(res, done)).catch(errorHandler(req, res, done))
  }
}
