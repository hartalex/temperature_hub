require('es6-promise').polyfill()
require('isomorphic-fetch')
const config = require('../../config.js')
const forecast = require('../../test/data/openweathermap-api/mock-api-response-forecast.json')

module.exports = function (req, res) {
  if (config.openweathermap_key === '') {
    res.json(forecast)
  } else {
    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + config.zipCode + ',us&cnt=3&units=imperial&APPID=' + config.openweathermap_key).then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu)
    }).catch(function (err) {
      res.json({})
    })
  }
}
