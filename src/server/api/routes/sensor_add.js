const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
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
        if ('sensorId' in svc) {
          if (typeof svc.sensorId === 'string') {
            if (svc.sensorId.length > 0) {
              if ('name' in svc) {
                if (typeof svc.name === 'string') {
                  if (svc.name.length > 0) {
                    db.queryOneData(dbobj, {
                      sensorId: svc.sensorId
                    }, 'sensors', function (result) {
                      if (result == null) {
                        db.queryOneData(dbobj, {
                          name: svc.name
                        }, 'sensors', function (result) {
                          if (result == null) {
                            var insertPromise = db.insertData(dbobj, 'sensors', svc)
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
                              reason: 'Sensor already exists'
                            })
                          }
                        })
                      } else {
                        dbobj.close()
                        reject({
                          result: 'fail',
                          reason: 'Sensor already exists'
                        })
                      }
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
                reason: 'Property sensorId is an empty string'
              })
            }
          } else {
            dbobj.close()
            reject({
              result: 'fail',
              reason: 'Property sensorId is not a string'
            })
          }
        } else {
          dbobj.close()
          reject({
            result: 'fail',
            reason: 'Property sensorId is missing'
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
    res.status(500)
    res.json(err)
  })
}
