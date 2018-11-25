const logging = require('winston')
const finish = require('./done')

module.exports = (slack) => { // dependency injection
  return (req, res, done) =>{
    return (err) => {
      logging.log('error', req.method + ' ' + req.url, err)
      slack.SlackPost(err, req).catch(function(slackErr) {
        logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
      })
      res.status(500)
      res.json({
        result: 'fail',
        reason: err
      })
      finish(done)
    }
  }
}
