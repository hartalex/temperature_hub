'use strict'
const config = require('./config')

var greenlock = require('greenlock-express')

module.exports = function (app) {
  var retval = {
  server: 'staging',
  approveDomains: config.greenlock_domains,
  email: config.greenlock_email,
  agreeTos: true,
  debug: true
  }
  if (config.greenlock_staging == false) {
    retval.server = 'production'
  }
  console.log(retval)
  return greenlock.create(retval)
}
