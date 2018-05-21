const slackPost = require('../data/slack')
const configImport = require('../../config')
const finish = require('./done')
const errorHandlerModule = require('./errorHandler')

module.exports = function(config, slack) {
  if (typeof config == 'undefined') {
    config = configImport
  }
  if (typeof slack == 'undefined') {
    slack = slackPost(config.slackUrl)
  }
  const errorHandler = errorHandlerModule(slack)
  return function(func, req, res, done) {
  return func.then(function(output) {
    res.status(200)
    res.json(output)
    finish(done)
  }).catch(errorHandler(req, res, done))
}
}
