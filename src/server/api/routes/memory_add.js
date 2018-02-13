const db = require('../db/mongodb')()
const dbUrl = require('../db/url')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  var collection = 'memory'
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var memoryItem = req.body
      if (typeof memoryItem === 'undefined') {
        dbobj.close()
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
                                }, collection, function (result) {
                                  if (result == null) {
                                    var insertPromise = db.insertData(dbobj, collection, memoryItem)
                                    insertPromise.then(function (result) {
                                      dbobj.close()
                                      resolve(result)
                                    }).catch(function (err) {
                                      dbobj.close()
                                      reject(err)
                                    })
                                  } else {
                                    dbobj.close()
                                    reject({
                                      result: 'fail',
                                      reason: 'memoryItem already exists'
                                    })
                                  }
                                })
                        } else {
                          dbobj.close()
                          reject({
                            result: 'fail',
                            reason: 'Property secondMemory is an empty string'
                          })
                        }
                      } else {
                        dbobj.close()
                        reject({
                          result: 'fail',
                          reason: 'Property secondMemory is not a string'
                        })
                      }
                    } else {
                      dbobj.close()
                      reject({
                        result: 'fail',
                        reason: 'Missing secondMemory property'
                      })
                    }
                  } else {
                    dbobj.close()
                    reject({
                      result: 'fail',
                      reason: 'Property firstMemory is an empty string'
                    })
                  }
                } else {
                  dbobj.close()
                  reject({
                    result: 'fail',
                    reason: 'Property firstMemory is not a string'
                  })
                }
              } else {
                dbobj.close()
                reject({
                  result: 'fail',
                  reason: 'Missing firstMemory property'
                })
              }
            } else {
              dbobj.close()
              reject({
                result: 'fail',
                reason: 'Property date is an empty string'
              })
            }
          } else {
            dbobj.close()
            reject({
              result: 'fail',
              reason: 'Property date is not a string'
            })
          }
        } else {
          dbobj.close()
          reject({
            result: 'fail',
            reason: 'Property date is missing'
          })
        }
      }
    })
  }).then(function (result) {
    return new Promise(function (resolve, reject) {
      if (result != null && result.result.n > 0) {
        res.json({result: 'ok'})
      } else {
        reject('result was not inserted to database')
      }
    })
  }).catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.status(500)
    res.json(err)
  })
}
