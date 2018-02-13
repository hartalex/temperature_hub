const db = require('../db/mongodb')()
const dbUrl = require('../db/url')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      if ('sensorId' in req.params) {
        query = {
          sensorId: req.params.sensorId
        }
      }
      db.queryData(dbobj, query, 'temperatures', function (temps) {
        for (var i = 0; i < temps.length; i++) {
          delete temps[i]._id
        }
        dbobj.close()
        resolve(temps)
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
