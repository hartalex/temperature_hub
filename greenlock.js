'use strict'
const config = require('./config')

var greenlock = require('greenlock-express')

module.exports = function (app) {
  return greenlock.create({
    server: 'staging',
    email: config.email,
    agreeTos: true,
    approveDomains: config.domains,
    app: app
  })
}
