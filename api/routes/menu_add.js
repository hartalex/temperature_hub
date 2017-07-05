const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  var collection = 'menu'
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var menuItem = req.body
      if (typeof menuItem === 'undefined') {
        dbobj.close()
        reject({
          result: 'fail',
          reason: 'Request Body is Undefined'
        })
      } else {
        if ('date' in menuItem) {
          if (typeof menuItem.date === 'string') {
            if (menuItem.date.length > 0) {
              if ('firstOption' in menuItem) {
                if (typeof menuItem.firstOption === 'string') {
                  if (menuItem.firstOption.length > 0) {
                    if ('secondOption' in menuItem) {
                      if (typeof menuItem.secondOption === 'string') {
                        if (menuItem.secondOption.length > 0) {
                          if ('otherStuff' in menuItem) {
                            if (typeof menuItem.otherStuff === 'string') {
                              if (menuItem.otherStuff.length > 0) {
                                db.queryOneData(dbobj, {
                                  date: menuItem.date
                                }, collection, function (result) {
                                  if (result == null) {
                                    var insertPromise = db.insertData(dbobj, collection, menuItem)
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
                                      reason: 'menuItem already exists'
                                    })
                                  }
                                })
                              } else {
                                dbobj.close()
                                reject({
                                  result: 'fail',
                                  reason: 'Property otherStuff is an empty string'
                                })
                              }
                            } else {
                              dbobj.close()
                              reject({
                                result: 'fail',
                                reason: 'Property otherStuff is not a string'
                              })
                            }
                          } else {
                            dbobj.close()
                            reject({
                              result: 'fail',
                              reason: 'Missing otherStuff property'
                            })
                          }
                        } else {
                          dbobj.close()
                          reject({
                            result: 'fail',
                            reason: 'Property secondOption is an empty string'
                          })
                        }
                      } else {
                        dbobj.close()
                        reject({
                          result: 'fail',
                          reason: 'Property secondOption is not a string'
                        })
                      }
                    } else {
                      dbobj.close()
                      reject({
                        result: 'fail',
                        reason: 'Missing secondOption property'
                      })
                    }
                  } else {
                    dbobj.close()
                    reject({
                      result: 'fail',
                      reason: 'Property firstOption is an empty string'
                    })
                  }
                } else {
                  dbobj.close()
                  reject({
                    result: 'fail',
                    reason: 'Property firstOption is not a string'
                  })
                }
              } else {
                dbobj.close()
                reject({
                  result: 'fail',
                  reason: 'Missing firstOption property'
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
    res.status(500)
    res.json(err)
  })
}
