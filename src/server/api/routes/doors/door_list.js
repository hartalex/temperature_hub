const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)
const finish = require('../done')

module.exports = function (req, res, done) {
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      var query = {}
      if ('sensorId' in req.params) {
        query = {
          sensorId: req.params.sensorId
        }
      }
      db.queryData(dbobj, query, 'doors', function (err, doors) {
        if (err) {
          throw err;
        }
        for (var i = 0; i < doors.length; i++) {
          delete doors[i]._id
        }
        resolve(doors)
      })
  }).then(function (result) {
    res.json({'result':'ok', 'data':result})
    res.status(200)
    finish(done)
  }).catch(errorHandler(req, res, done))
}
