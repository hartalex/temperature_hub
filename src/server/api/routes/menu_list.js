const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
    var dbobj = req.db
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
        resolve(menu)
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
