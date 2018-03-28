require('es6-promise').polyfill()
require('isomorphic-fetch')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  if (config.openweathermap_key !== '') {
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + config.zipCode + ',us&units=imperial&APPID=' + config.openweathermap_key).then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu)
    }).catch(function (err) {
      logging.log('error', req.method + ' ' + req.url, err)
      slack.SlackPost(err, req).catch(function(slackErr) {
        logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
      })
      res.json({})
    })
  }

}
