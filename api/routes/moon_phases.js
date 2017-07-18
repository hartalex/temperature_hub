require('es6-promise').polyfill()
require('isomorphic-fetch')
const config = require('../../config.js')
const moon = require('../../test/data/wunderground-api/mock-api-response-moon.json')

module.exports = function (req, res) {
  if (config.wunderground_key === '') {
    res.json(moon.moon_phase)
  } else {
    fetch('http://api.wunderground.com/api/' + config.wunderground_key + '/astronomy/q/' + config.zipCode + '.json').then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    }).then(function (resu) {
      res.json(resu.moon_phase)
    }).catch(function (err) {
      res.json({})
    })
  }

}
