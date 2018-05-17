require('es6-promise').polyfill()
require('isomorphic-fetch')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')
const finish = require('./done')

module.exports = function (req, res, done) {
  var slack = slackPost(config.slackUrl)
  if (config.wunderground_key !== '') {
    fetch('https://api.wunderground.com/api/' + config.wunderground_key + '/forecast/q/' + config.zipCode + '.json').then(function (response) {
      if (!response.ok || response.status != 200) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu.forecast)
      finish(done)
    }).catch(function (err) {
      logging.log('error', req.method + ' ' + req.url, err)
      slack.SlackPost(err, req).catch(function(slackErr) {
        logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
      })
      res.json({})
      finish(done)
    })
  }
}
