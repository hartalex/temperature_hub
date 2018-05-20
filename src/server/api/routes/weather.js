import jsonResponseHandler from '../../jsonResponseHandler'
require('es6-promise').polyfill()
require('isomorphic-fetch')
const slackPost = require('../data/slack')
const default_config = require('../../config')
const finish = require('./done')
const errorHandlerModule = require('./errorHandler')

module.exports = function (req, res, done) {
  var config = req.config
  if (typeof config === 'undefined') {
    config = default_config
  }
  var slack = req.slack
  if (typeof slack == 'undefined') {
    slack = slackPost(config.slackUrl)
  }
  const errorHandler = errorHandlerModule(slack)
  if (config.openweathermap_key !== '') {
    fetch(config.weatherUrl + '?zip=' + config.zipCode + ',us&units=imperial&APPID=' + config.openweathermap_key)
    .then(jsonResponseHandler)
    .then(function (resu) {
      res.json(resu)
      finish(done)
    }).catch(errorHandler(req, res, done))
  } else {
    const err = 'weather api key not found in configuration'
    errorHandler(req, res, done)(err)
  }

}
