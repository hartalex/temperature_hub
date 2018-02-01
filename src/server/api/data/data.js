const dbUrl = require('../db/url')
const mongoDb = require('../db/mongodb')
const configImport = require('../../config')
const validation = require('./validation')
const temperatureModel = require('./models/temperatureModel')
const doorModel = require('./models/doorModel')

module.exports = {
  db: mongoDb,
  config: configImport,
  menuAdd: function (input) {
    var db = this.db
    const collection = 'menu'
    // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    return connectPromise
      .then(function (dbobj) { return validation.isNotUndefined(input, 'Input')
      .then(function() { return validation.isNotNull(input, 'Input')
    }).then(function() { return validation.hasProperty(input, 'date')
    }).then(function() { return validation.isTypeString(input.date, 'date')
    }).then(function() { return validation.stringHasLength(input.date, 'date')
    }).then(function() { return validation.hasProperty(input, 'firstOption')
    }).then(function() { return validation.isTypeString(input.firstOption, 'firstOption')
    }).then(function() { return validation.stringHasLength(input.firstOption, 'firstOption')
    }).then(function() { return validation.hasProperty(input, 'secondOption')
    }).then(function() { return validation.isTypeString(input.secondOption, 'secondOption')
    }).then(function() { return validation.stringHasLength(input.secondOption, 'secondOption')
    }).then(function() { return validation.hasProperty(input, 'otherStuff')
    }).then(function() { return validation.isTypeString(input.otherStuff, 'otherStuff')
    }).then(function() { return validation.stringHasLength(input.otherStuff, 'otherStuff')
    }).then(function() {
        return new Promise(function (resolve, reject) {
          db.queryOneData(dbobj, {date: input.date},
           collection, function (result) {
             if (result == null) {
               resolve({})
             } else {
               reject('menuItem already exists')
             }
           }) // db.queryOneData
        }) // Promise
      }).then(function() {
          return db.insertData(dbobj, collection, input)
      }).then(function (result) {
        dbobj.close()
          return new Promise(function (resolve, reject) {
              if (result != null && result.n > 0) {
                resolve({result: 'ok'})
              } else {
                reject('error end of promise')
              }
          })// Promise
        }).catch( function(err) { // Inner Promise Chain
          dbobj.close()
          throw err
        })
      })
  },
  dataAdd: function (input) {
    var db = this.db
    var config = this.config
    const time = new Date()
  // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    return connectPromise
      .then(function (dbobj) { return validation.isNotUndefined(input, 'Input')
      .then(function() { return validation.isNotNull(input, 'Input')
    }).then(function() {
      if (!('utc_timestamp' in input)) {
        input.utc_timestamp = time.toISOString()
      }
      var retval
      if ('id' in input) {
        retval= validation.isTypeString(input.id, 'id')
        .then(function() { return validation.stringHasLength(input.id, 'id')
        }).then(function() { return validation.hasProperty(input, 't')
        }).then(function() { return validation.isTypeNumber(input.t, 't')
        }).then(function() { return temperatureModel(input)
        }).then(function(temperature) { return new Promise(function (resolve) {
                        if (config.NoDuplicateData && config.NoDuplicateData === true) {
                          db.queryLastData(dbobj, {sensorId: temperature.sensorId}, {utc_timestamp: -1}, 'temperatures', function (existingData) {
                            if (existingData == null || (existingData != null && existingData.tempInFarenheit !== temperature.tempInFarenheit)) {
                              resolve({})
                             } else {
                              resolve({n: 1, reason: 'duplicate'})
                            }
                          })
                        } else {
                          resolve({})
                        }
                      }).then(function(result) {
                        var retval
                        if (result && 'n' in result) {
                          retval = new Promise(function (resolve) {
                            resolve(result)
                          })
                        } else {
                          retval = db.insertData(dbobj, 'temperatures', temperature)
                        }
                        return retval
                      })
                    })
                } else if ('sensorId' in input) {
        retval = validation.isTypeString(input.sensorId, 'sensorId')
            .then(function() { return validation.stringHasLength(input.sensorId, 'sensorId')
          }).then(function() { return validation.hasProperty(input, 'isOpen')
          }).then(function() { return validation.isTypeBoolean(input.isOpen, 'isOpen')
          }).then(function() {return doorModel(input)
          }).then(function(door) { return new Promise(function (resolve) {
                    if (config.NoDuplicateData && config.NoDuplicateData === true) {
                      db.queryLastData(dbobj, {sensorId: door.sensorId}, {utc_timestamp: -1}, 'doors', function (existingData) {
                        if (existingData == null || (existingData != null && existingData.isOpen !== door.isOpen)) {
                          resolve({})
                        } else {
                          resolve({n: 1, reason: 'duplicate'})
                        }
                      })
                    } else {
                      resolve({})
                    }
                  }).then(function(result) {
                    var retval
                    if (result && 'n' in result) {
                      retval =  new Promise(function (resolve) {
                        resolve(result)
                      })
                    } else {
                      retval = db.insertData(dbobj, 'doors', door)
                    }
                    return retval
                  })
                })
          } else {
            throw 'Property id/sensorId is missing'
          }
          return retval;
        }).then(function (result) {
          dbobj.close()
          return new Promise(function (resolve, reject) {
              if (result != null && result.n > 0 ) {
                var retval = {result: 'ok'}
                if (result.reason) {
                  retval.reason = result.reason
                }
                resolve(retval)
              } else {
                reject('error end of promise')
              }
          })// Promise
      }).catch( function(err) { // Inner Promise Chain
        dbobj.close()
        throw err
      })

    })
  }
}
