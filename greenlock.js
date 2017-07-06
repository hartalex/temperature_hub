'use strict'
const config = require('./config')

var greenlock = require('greenlock-express')

module.exports = function (app) {
  var retval = {
  server: 'staging',
  approveDomains: config.greenlock_domains,
  email: config.greenlock_email,
  agreeTos: true
  }
  if (config.greenlock_staging == false) {
    retval.server = 'https://acme-v01.api.letsencrypt.org/directory'
  }
  return greenlock.create(retval)
}
