const db = require('../db/mongodb')()
const dbUrl = require('../db/url')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  return connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      var sort = { date: -1 }
      if ('date' in req.params) {
        query = {
          date:
          {
            '$lte': req.params.date
          }
        }
      }
      db.queryLastData(dbobj, query, sort, 'memory', function (memory) {
        if (memory) {
        for (var i = 0; i < memory.length; i++) {
          delete memory[i]._id
        }
      } else {
        memory = []
      }
        dbobj.close()

        resolve(memory)
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
