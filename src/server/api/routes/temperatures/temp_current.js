import jsonResponseHandler from '../../../jsonResponseHandler'
require('es6-promise').polyfill()
require('isomorphic-fetch')
const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)

module.exports = function (req, res, done) {
  fetch('http://hub.hartcode.com/temp/sensor/list')
  .then(jsonResponseHandler)
  .then(function (sensorjson) {
    var retval = []
    var dbobj = req.db
    Promise.all(sensorjson.data.map(function (sensor) {
      return new Promise(function (resolve, reject) {
        db.queryLastData(dbobj, {sensorId: sensor.sensorId}, {utc_timestamp: -1}, 'temperatures', function (error, temp) {
          if (error) { throw error }
          if (temp != null) {
            temp.sensorName = sensor.name
            temp.outdated = new Date() - new Date(temp.utc_timestamp) > 5 * 60000
            delete temp._id
            retval.push(temp)
          }
          resolve()
        })
      })
    })).then(function () {
      res.json(retval)
    }).catch(errorHandler(req, res, done))
  }).catch(errorHandler(req, res, done))
}
