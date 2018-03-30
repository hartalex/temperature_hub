require('es6-promise').polyfill()
require('isomorphic-fetch')
const slackPost = require('../data/slack')
const default_config = require('../../config')
const logging = require('winston')

module.exports = function (req, res, done) {
  var config = req.config
  if (typeof config === 'undefined') {
    config = default_config
  }
  var slack = req.slack
  if (typeof slack == 'undefined') {
    slack = slackPost(config.slackUrl)
  }
  if (config.openweathermap_key !== '') {
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + config.zipCode + ',us&units=imperial&APPID=' + config.openweathermap_key).then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu)
      /* istanbul ignore next */
      if (done && typeof done === 'function') {
        done()
      }
    }).catch(function (err) {
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
  } else {
    const err = 'weather api key not found in configuration'
    logging.log('error', err)
    res.status(500)
    res.json({
      result: 'fail',
      reason: err
    })
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  }

}
