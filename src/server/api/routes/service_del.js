const db = require('../db/mongodb')()
const dbUrl = require('../db/url')
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')

module.exports = function (req, res) {
  var slack = slackPost(config.slackUrl)
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var svc = req.body
      if (typeof svc === 'undefined') {
        dbobj.close()
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
                    db.deleteData(dbobj, 'services', svc, function (result) {
                      if (result != null && result.result.n > 0) {
                        dbobj.close()
                        resolve({
                          result: 'ok'
                        })
                      } else {
                        dbobj.close()
                        reject({
                          result: 'fail'
                        })
                      }
                      dbobj.close()
                    })
                  } else {
                    dbobj.close()
                    reject({
                      result: 'fail',
                      reason: 'Property name is an empty string'
                    })
                  }
                } else {
                  dbobj.close()
                  reject({
                    result: 'fail',
                    reason: 'Property name is not a string'
                  })
                }
              } else {
                dbobj.close()
                reject({
                  result: 'fail',
                  reason: 'Missing name property'
                })
              }
            } else {
              dbobj.close()
              reject({
                result: 'fail',
                reason: 'Property url is an empty string'
              })
            }
          } else {
            dbobj.close()
            reject({
              result: 'fail',
              reason: 'Property url is not a string'
            })
          }
        } else {
          dbobj.close()
          reject({
            result: 'fail',
            reason: 'Property url is missing'
          })
        }
      }
    })
  }).then(function (result) {
    res.json(result)
  }).catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.status(500)
    res.json(err)
  })
}
