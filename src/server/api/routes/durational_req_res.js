import jsonResponsePromise from '../../jsonResponsePromise'
const config = require('../../config')
const slack = require('../data/slack')(config.slackUrl)
const errorHandler = require('./errorHandler')(slack)
const doAggregateQuery = require('./aggregateQuery')

module.exports = {
  durational_req_res: function (getAggregateQuery, collection) {
    var months = doAggregateQuery.findDataByTime(doAggregateQuery.months, getAggregateQuery, collection).bind(doAggregateQuery)
    var days = doAggregateQuery.findDataByTime(doAggregateQuery.days, getAggregateQuery, collection).bind(doAggregateQuery)
    var hours = doAggregateQuery.findDataByTime(doAggregateQuery.hours, getAggregateQuery, collection).bind(doAggregateQuery)
    return function(req, res, done) {
      var duration
      if ('duration' in req.params) {
        duration = req.params.duration
      }
      duration = this.validateDuration(duration)
      // Use connect method to connect to the Server
      return new Promise(function(resolve, reject) {
          function resolveCallback(error, temps) {
            if (error) { throw error }
            resolve(temps)
          }
          if (duration === '1h') {
            hours(req.db, 1, resolveCallback)
          } else if (duration === '12h') {
            hours(req.db, 12, resolveCallback)
          } else if (duration === '24h') {
            hours(req.db, 24, resolveCallback)
          } else if (duration === '3d') {
            days(req.db, 3, resolveCallback)
          } else if (duration === '7d') {
            days(req.db, 7, resolveCallback)
          } else if (duration === '14d') {
            days(req.db, 14, resolveCallback)
          } else if (duration === '28d') {
            days(req.db, 28, resolveCallback)
          } else if (duration === '1m') {
            months(req.db, 1, resolveCallback)
          } else if (duration === '3m') {
            months(req.db, 3, resolveCallback)
          } else if (duration === '6m') {
            months(req.db, 6, resolveCallback)
          } else if (duration === '12m') {
            months(req.db, 12, resolveCallback)
          } else {
            reject('Duration could not be handled ' + duration)
          }
        }).then(jsonResponsePromise(res, done))
        .catch(errorHandler(req, res, done))
    }
  },
  validDurations: ['1h', '12h', '24h', '3d', '7d', '14d', '28d', '1m', '3m', '6m', '12m', '00'],
  validateDuration: function(duration) {
    var retval = this.validDurations[0]
    if (this.validDurations.indexOf(duration) !== -1) {
      retval = this.validDurations[this.validDurations.indexOf(duration)]
    }
    return retval
  }
}
