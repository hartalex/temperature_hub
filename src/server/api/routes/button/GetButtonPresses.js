import jsonResponsePromise from '../../../jsonResponsePromise'
const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)

module.exports = function (req, res, done) {
  let dbobj = req.db
  return new Promise(function (resolve, reject) {
    let query = {
      id: 1
    }

    db.queryOneData(dbobj, query, 'button', function (err, button) {
      if (err) {
        throw err
      }
      if (!button) {
        button = { id: 1, count: 0 }
      }
      resolve(button)
    })
  })
    .then(jsonResponsePromise(res, done))
    .catch(errorHandler(req, res, done))
}
