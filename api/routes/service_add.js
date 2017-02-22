const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var svc = req.body
      if (typeof svc === 'undefined') {
        console.log('Error request body is undefined')
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
                    console.log(svc)
                    db.queryOneData(dbobj, {
                      url: svc.url
                    }, 'services', function (result) {
                      if (result == null) {
                        db.queryOneData(dbobj, {
                          name: svc.name
                        }, 'services', function (result) {
                          if (result == null) {
                            var insertPromise = db.insertData(dbobj, 'services', svc)
                            insertPromise.then(function (result) {
                              dbobj.close()
                              console.log('object inserted')
                              resolve(result)
                            }).catch(function (err) {
                              console.log('object not inserted')
                              dbobj.close()
                              reject(err)
                            })
                          } else {
                            console.log('Error name already exists')
                            dbobj.close()
                            reject({
                              result: 'fail',
                              reason: 'Service already exists'
                            })
                          }
                        })
                      } else {
                        console.log('Error url already exists')
                        dbobj.close()
                        reject({
                          result: 'fail',
                          reason: 'Service already exists'
                        })
                      }
                    })
                  } else {
                    console.log('Error name property cannot be empty')
                    dbobj.close()
                    reject({
                      result: 'fail',
                      reason: 'Property name is an empty string'
                    })
                  }
                } else {
                  console.log('Error name property is not a string')
                  dbobj.close()
                  reject({
                    result: 'fail',
                    reason: 'Property name is not a string'
                  })
                }
              } else {
                console.log('Error json object is missing the name property')
                dbobj.close()
                reject({
                  result: 'fail',
                  reason: 'Missing name property'
                })
              }
            } else {
              console.log('Error url property cannot be empty')
              dbobj.close()
              reject({
                result: 'fail',
                reason: 'Property url is an empty string'
              })
            }
          } else {
            console.log('Error url property is not a string')
            dbobj.close()
            reject({
              result: 'fail',
              reason: 'Property url is not a string'
            })
          }
        } else {
          console.log('Error json object is missing the url property')
          dbobj.close()
          reject({
            result: 'fail',
            reason: 'Property url is missing'
          })
        }
      }
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        console.log('handle results')
        console.log(result)
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
  })
}
