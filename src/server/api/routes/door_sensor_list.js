const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      db.querydistinctData(dbobj, 'sensorId', 'doors', function (temps) {
        db.queryData(dbobj, {}, 'sensors', function (sensors) {
        var array = []
          for (var i = 0; i < temps.length; i++) {
            var obj = {
              sensorId: temps[i]
            }
            for (var s = 0; s < sensors.length; s++) {
              if (temps[i] === sensors[s].sensorId) {
                obj.name = sensors[s].name
              }
            }
            array.push(obj)
          }
          resolve(array)
        })
      })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.json([])
  })
}
