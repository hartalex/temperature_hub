const jsonResponsePromise = require('../../jsonResponsePromise')
const slackPost = require('../data/slack')
const configImport = require('../../config')
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
    return func
      .then(jsonResponsePromise(res, done))
      .catch(errorHandler(req, res, done))
  }
}
