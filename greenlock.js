'use strict'
const config = require('./config')

var greenlock = require('greenlock-express')

module.exports = function (app) {
  var retval = {
  server: 'staging',
  email: config.greenlock_email,
  agreeTos: true,
  approveDomains: config.greenlock_domains,
  app: app
  }
  if (config.greenlock_staging && config.greenlock_staging == false) {
    retval.server = 'https://acme-v01.api.letsencrypt.org/directory'
  }
  return greenlock.create(retval)
}
