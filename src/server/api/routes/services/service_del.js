const db = require('../../db/mongodb')()
const slackPost = require('../../data/slack')
const config = require('../../../config')
const logging = require('winston')
const finish = require('../done')

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
        if ('url' in svc) {
          if (typeof svc.url === 'string') {
            if (svc.url.length > 0) {
              if ('name' in svc) {
                if (typeof svc.name === 'string') {
                  if (svc.name.length > 0) {
                    db.deleteData(dbobj, 'services', svc, function (error, result) {
                      if (error === null && result.result.n > 0) {
                        resolve({
                          result: 'ok'
                        })
                      } else {
                        reject({
                          result: 'fail',
                          reason: error
                        })
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
                reason: 'Property url is an empty string'
              })
            }
          } else {
            reject({
              result: 'fail',
              reason: 'Property url is not a string'
            })
          }
        } else {
          reject({
            result: 'fail',
            reason: 'Property url is missing'
          })
        }
      }
  }).then(function (result) {
    res.json(result)
    finish(done)
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
