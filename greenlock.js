'use strict'
const config = require('config')

var LE = require('greenlock')
var le

// Storage Backend
var leStore = require('le-store-certbot').create({
  configDir: '~/acme/etc',                                 // or /etc/letsencrypt or wherever
  debug: false
})

// ACME Challenge Handlers
var leHttpChallenge = require('le-challenge-fs').create({
  webrootPath: '~/acme/var/',                              // or template string such as
  debug: false                                            // '/srv/www/:hostname/.well-known/acme-challenge'
})
var leSniChallenge = require('le-challenge-sni').create({
  debug: false
})

function leAgree (opts, agreeCb) {
  // opts = { email, domains, tosUrl }
  agreeCb(null, opts.tosUrl)
}

le = LE.create({
  server: LE.stagingServerUrl,                             // or LE.productionServerUrl
  store: leStore,                                          // handles saving of config, accounts, and certificates
  challenges: {
    'http-01': leHttpChallenge,                            // handles /.well-known/acme-challege keys and tokens
    'tls-sni-01': leSniChallenge,                          // handles generating a certificate with the correct name
    'tls-sni-02': leSniChallenge
  },
  challengeType: 'http-01',                                // default to this challenge type
  agreeToTerms: leAgree,                                   // hook to allow user to view and accept LE TOS
//, sni: require('le-sni-auto').create({})                // handles sni callback
  debug: false
//, log: function (debug) {console.log.apply(console, args);} // handles debug outputs
})

// If using express you should use the middleware
// app.use('/', le.middleware());
//
// Otherwise you should see the test file for usage of this:
// le.challenges['http-01'].get(opts.domain, key, val, done)

// Check in-memory cache of certificates for the named domain
le.check({ domains: config.domains }).then(function (results) {
  if (results) {
    // we already have certificates
    return
  }

  // Register Certificate manually
  le.register({

    domains: config.domains,                                // CHANGE TO YOUR DOMAIN (list for SANS)
    email: config.email,                                 // CHANGE TO YOUR EMAIL
    agreeTos: '',                                            // set to tosUrl string (or true) to pre-approve (and skip agreeToTerms)
    rsaKeySize: 2048,                                        // 2048 or higher
    challengeType: 'http-01'                                // http-01, tls-sni-01, or dns-01

  }).then(function (results) {
    console.log('success')
  }, function (err) {
    // Note: you must either use le.middleware() with express,
    // manually use le.challenges['http-01'].get(opts, domain, key, val, done)
    // or have a webserver running and responding
    // to /.well-known/acme-challenge at `webrootPath`
    console.error('[Error]: node-greenlock/examples/standalone')
    console.error(err.stack)
  })
})

module.exports = le.middleware()
