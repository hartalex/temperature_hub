const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)
const finish = require('../done')

module.exports = function (req, res, done) {
  var collection = 'memory'
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      var memoryItem = req.body
      if (typeof memoryItem === 'undefined') {
        reject({
          result: 'fail',
          reason: 'Request Body is Undefined'
        })
      } else {
        if ('date' in memoryItem) {
          if (typeof memoryItem.date === 'string') {
            if (memoryItem.date.length > 0) {
              if ('firstMemory' in memoryItem) {
                if (typeof memoryItem.firstMemory === 'string') {
                  if (memoryItem.firstMemory.length > 0) {
                    if ('secondMemory' in memoryItem) {
                      if (typeof memoryItem.secondMemory === 'string') {
                        if (memoryItem.secondMemory.length > 0) {
                                db.queryOneData(dbobj, {
                                  date: memoryItem.date
                                }, collection, function (error, result) {
                                  if (error === null && result === null) {
                                    var insertPromise = db.insertData(dbobj, collection, memoryItem)
                                    insertPromise.then(function (result) {
                                      resolve(result)
                                    }).catch(function (err) {
                                      reject(err)
                                    })
                                  } else {
                                    var err = {
                                      result: 'fail',
                                      reason: 'memoryItem already exists'
                                    }
                                    if (result !== null) {
                                      err.reason = error
                                    }
                                    reject(err)
                                  }
                                })
                        } else {
                          reject({
                            result: 'fail',
                            reason: 'Property secondMemory is an empty string'
                          })
                        }
                      } else {
                        reject({
                          result: 'fail',
                          reason: 'Property secondMemory is not a string'
                        })
                      }
                    } else {
                      reject({
                        result: 'fail',
                        reason: 'Missing secondMemory property'
                      })
                    }
                  } else {
                    reject({
                      result: 'fail',
                      reason: 'Property firstMemory is an empty string'
                    })
                  }
                } else {
                  reject({
                    result: 'fail',
                    reason: 'Property firstMemory is not a string'
                  })
                }
              } else {
                reject({
                  result: 'fail',
                  reason: 'Missing firstMemory property'
                })
              }
            } else {
              reject({
                result: 'fail',
                reason: 'Property date is an empty string'
              })
            }
          } else {
            reject({
              result: 'fail',
              reason: 'Property date is not a string'
            })
          }
        } else {
          reject({
            result: 'fail',
            reason: 'Property date is missing'
          })
        }
      }
  }).then(function (result) {
    return new Promise(function (resolve, reject) {
      if (result != null && result.result.n > 0) {
        res.json({result: 'ok'})
        finish(done)
      } else {
        reject('result was not inserted to database')
      }
    })
  }).catch(errorHandler(req, res, done))
}
