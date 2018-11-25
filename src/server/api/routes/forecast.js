require('es6-promise').polyfill()
require('isomorphic-fetch')
const config = require('../../config')
const slack = require('../data/slack')(config.slackUrl)
const errorHandler = require('./errorHandler')(slack)
const finish = require('./done')

module.exports = function (req, res, done) {
  if (config.wunderground_key !== '') {
    fetch('https://api.wunderground.com/api/' + config.wunderground_key + '/forecast/q/' + config.zipCode + '.json').then(function (response) {
      if (!response.ok || response.status != 200) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu.forecast)
      finish(done)
    }).catch(errorHandler(req, res, done))
  }
}
