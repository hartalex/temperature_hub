import jsonResponsePromise from '../../../jsonResponsePromise'
const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)

module.exports = function (req, res, done) {
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      var query = {}
      var sort = { date: -1 }
      if ('date' in req.params) {
        query = {
          date:
          {
            '$lte': req.params.date
          }
        }
      }
      db.queryLastData(dbobj, query, sort, 'memory', function (error, memory) {
        if (error) {
          throw error
        }
        delete memory._id
        resolve(memory)
      })
  }).then(jsonResponsePromise(res, done)).catch(errorHandler(req, res, done))
}
