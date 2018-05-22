import dbModule from '../db/mongodb'
import slackUrl from '../../config'
import slackModule from '../data/slack'
import errorHandlerModule from './errorHandler'
import validation from '../data/validation'



module.exports = (() => {
const db = dbModule()
const slack = slackModule(slackUrl)
const errorHandler = errorHandlerModule(slack)
function checkStringField(obj, field) {
  return validation.isNotUndefined(obj, 'svc')
  .then(() => {
    return validation.hasProperty(obj, field)
  })
  .then(() => {
    return validation.isTypeString(obj[field], field)
  })
  .then(() => {
    return validation.stringHasLength(obj[field], field)
  })
}
function checkExists(dbobj, collection, query, itemName) {
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

return function (collection, field1, field2, itemName) {
  return function(req, res, done) {
      // Use connect method to connect to the Server
      return validation.isNotUndefined(req.body, 'svc')
      .then(() => {
        checkStringField(req.body, field1)
      })
      .then(() => {
        checkStringField(req.body, field2)
      })
      .then(checkExists(req.db, collection, { field1: req.body[field1] }, itemName))
      .then(checkExists(req.db, collection, { field2: req.body[field2] }, itemName))
      .then(() => {
        return db.insertData(req.db, collection, req.body)
      }).then(() => {
        return {
          result: 'ok'
        }
      })
      .catch(errorHandler(req, res, done))}
    }
})()
