const db = require('../../db/mongodb')()
const slackPost = require('../../data/slack')
const config = require('../../../config')
const logging = require('winston')
const finish = require('../done')

module.exports = (req, res, done) => {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
  var dbobj = req.db
    return new Promise((resolve, reject) => {
      db.queryData(dbobj, {}, 'services', (err, svcs ) => {
        if (err) {
          throw err;
        }
        for (var i = 0; i < svcs.length; i++) {
          delete svcs[i]._id
        }
        resolve(svcs)
      })
  }).then((result) => {
    res.json({'result':'ok', 'data':result})
    res.status(200)
    finish(done)
  })
  .catch((err) => {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch((slackErr) => {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.status(500)
    res.json({
      result: 'fail',
      reason: err
    })
    finish(done)
  })
}
