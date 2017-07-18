require('es6-promise').polyfill()
require('isomorphic-fetch')
const config = require('../../config.js')
const forecast = require('../../test/data/wunderground-api/mock-api-response-forecast.json')

module.exports = function (req, res) {
  if (config.wunderground_key === '') {
    res.json(forecast)
  } else {
    fetch('http://api.wunderground.com/api/' + config.wunderground_key + '/forecast/q/' + config.zipCode + '.json').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu.forecast)
    }).catch(function (err) {
      res.json({})
    })
  }
}
