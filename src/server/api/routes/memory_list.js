const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')
const finish = require('./done')

module.exports = function (req, res, done) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
    var dbobj = req.db
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
      db.queryLastData(dbobj, query, sort, 'memory', function (error, memory) {
        if (error) {
          throw error
        }
        if (memory) {
        for (var i = 0; i < memory.length; i++) {
          delete memory[i]._id
        }
      } else {
        memory = []
      }
        resolve(memory)
      })
  }).then(function (result) {
    res.json(result)
    finish(done)
  })
  .catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.json([])
    finish(done)
  })
}
