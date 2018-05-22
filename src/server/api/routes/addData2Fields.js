const db = require('../db/mongodb')()
const config = require('../../config')
const slack = require('../data/slack')(config.slackUrl)
const errorHandler = require('./errorHandler')(slack)
const validation = require('../data/validation')

module.exports =
function (collection, field1, field2, itemName) {
  return function(req, res, done) {
    function checkExists(query, itemName) {
      return new Promise((resolve, reject) => {
        db.queryOneData(dbobj, query, collection,
          (error, result) => {
            if (error === null && result === null) {
              resolve({})
            } else {
              reject(itemName + ' already exists')
            }
          }) // db.queryOneData
        })
      }
      // Use connect method to connect to the Server
      var dbobj = req.db
      var svc = req.body
      return validation.isNotUndefined(svc, 'svc')
      .then(() => {
        return validation.hasProperty(svc, field1)
      })
      .then(() => {
        return validation.isTypeString(svc[field1], field1)
      })
      .then(() => {
        return validation.stringHasLength(svc[field1], field1)
      })
      .then(() => {
        return validation.hasProperty(svc, field2)
      })
      .then(() => {
        return validation.isTypeString(svc[field2], field2)
      })
      .then(() => {
        return validation.stringHasLength(svc[field2], field2)
      })
      .then(checkExists({ field1: svc[field1] }, itemName))
      .then(checkExists({ field2: svc[field2] }, itemName))
      .then(() => {
        return db.insertData(dbobj, collection, svc)
      }).then(() => {
        return {
          result: 'ok'
        }
      })
      .catch(errorHandler(req, res, done))}
}
