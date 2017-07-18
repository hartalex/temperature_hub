require('es6-promise').polyfill()
require('isomorphic-fetch')
const config = require('../../config.js')
const weather = require('../../test/data/openweathermap-api/mock-api-response-weather.json')

module.exports = function (req, res) {
  if (config.openweathermap_key === '') {
    res.json(weather)
  } else {
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + config.zipCode + ',us&units=imperial&APPID=' + config.openweathermap_key).then(function (response) {
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
