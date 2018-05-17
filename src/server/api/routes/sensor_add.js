const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')
const finish = require('./done')

module.exports = function (req, res, done) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      var svc = req.body
      if (typeof svc === 'undefined') {
        reject({
          result: 'fail',
          reason: 'Request Body is Undefined'
        })
      } else {
        if ('sensorId' in svc) {
          if (typeof svc.sensorId === 'string') {
            if (svc.sensorId.length > 0) {
              if ('name' in svc) {
                if (typeof svc.name === 'string') {
                  if (svc.name.length > 0) {
                    db.queryOneData(dbobj, {
                      sensorId: svc.sensorId
                    }, 'sensors', function (error, result) {
                      if (error === null && result === null) {
                        db.queryOneData(dbobj, {
                          name: svc.name
                        }, 'sensors', function (error, result) {
                          if (error === null && result === null) {
                            var insertPromise = db.insertData(dbobj, 'sensors', svc)
                            insertPromise.then(function (result) {
                              resolve(result)
                            }).catch(function (err) {
                              reject(err)
                            })
                          } else {
                            var err = {
                              result: 'fail',
                              reason: 'Sensor already exists'
                            }
                            if (result !== null) {
                              err.reason = error
                            }
                            reject(err)
                          }
                        })
                      } else {
                        var err = {
                          result: 'fail',
                          reason: 'Sensor already exists'
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
                      reason: 'Property name is an empty string'
                    })
                  }
                } else {
                  reject({
                    result: 'fail',
                    reason: 'Property name is not a string'
                  })
                }
              } else {
                reject({
                  result: 'fail',
                  reason: 'Missing name property'
                })
              }
            } else {
              reject({
                result: 'fail',
                reason: 'Property sensorId is an empty string'
              })
            }
          } else {
            reject({
              result: 'fail',
              reason: 'Property sensorId is not a string'
            })
          }
        } else {
          reject({
            result: 'fail',
            reason: 'Property sensorId is missing'
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
  }).catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.status(500)
    res.json(err)
    finish(done)
  })
}
