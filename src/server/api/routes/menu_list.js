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
      if ('date' in req.params) {
        query = {
          date: req.params.date
        }
      }
      db.queryData(dbobj, query, 'menu', function (menu) {
        for (var i = 0; i < menu.length; i++) {
          delete menu[i]._id
        }
        dbobj.close()
        resolve(menu)
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
