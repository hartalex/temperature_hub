const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
  var dbobj = req.db
    return new Promise(function (resolve, reject) {
      db.queryData(dbobj, {}, 'services', function (svcs) {
        for (var i = 0; i < svcs.length; i++) {
          delete svcs[i]._id
        }
        resolve(svcs)
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
