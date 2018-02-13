const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function(func, req, res, done) {
  var slack = slackPost(config.slackUrl)
  return func.then(function(output) {
    res.status(200)
    res.json(output)
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  }).catch(function(err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.status(500)
    res.json({
      result: 'fail',
      reason: err
    })
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  })
}
