const dbUrl = require('../db/url')
const configImport = require('../../config')
const validation = require('./validation')
const temperatureModel = require('./models/temperatureModel')
const doorModel = require('./models/doorModel')

const checkDupesPromise = function(config, db, dbobj, query, sort, collection, dupeProp, dupeObject) {
  return new Promise(function(resolve) {
    if (config.NoDuplicateData && config.NoDuplicateData === true) {
      db.queryLastData(dbobj, query, sort, collection, function(existingData) {
        if (existingData == null || (existingData != null && existingData[dupeProp] !== dupeObject[dupeProp])) {
          resolve({}, dupeObject)
        } else {
          resolve({
            n: 1,
            reason: 'duplicate'
          }, dupeObject)
        }
      })
    } else {
      resolve({}, dupeObject)
    }
  })
}

const insertDataPromise = function(result, data, db, dbobj, collection) {
  var retval
  if (result && 'n' in result) {
    retval = new Promise(function(resolve) {
      resolve(result)
    })
  } else {
    retval = db.insertData(dbobj, collection, data)
  }
  return retval
}

const returnValuePromise = function(result) {
  return new Promise(function(resolve, reject) {
    if (result != null && result.n > 0) {
      var retval = {
        result: 'ok'
      }
      if (result.reason) {
        retval.reason = result.reason
      }
      resolve(retval)
    } else {
      reject('error end of promise')
    }
  })
}

module.exports = function(db) {
return {
  menuAdd: function(input) {
    const collection = 'menu'
    // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    return connectPromise
      .then(function(dbobj) {
        return validation.isNotUndefined(input, 'Input')
          .then(function() {
            return validation.isNotNull(input, 'Input')
          })
          .then(function() {
            return validation.hasProperty(input, 'date')
          })
          .then(function() {
            return validation.isTypeString(input.date, 'date')
          })
          .then(function() {
            return validation.stringHasLength(input.date, 'date')
          })
          .then(function() {
            return validation.hasProperty(input, 'firstOption')
          })
          .then(function() {
            return validation.isTypeString(input.firstOption, 'firstOption')
          })
          .then(function() {
            return validation.stringHasLength(input.firstOption, 'firstOption')
          })
          .then(function() {
            return validation.hasProperty(input, 'secondOption')
          })
          .then(function() {
            return validation.isTypeString(input.secondOption, 'secondOption')
          })
          .then(function() {
            return validation.stringHasLength(input.secondOption, 'secondOption')
          })
          .then(function() {
            return validation.hasProperty(input, 'otherStuff')
          })
          .then(function() {
            return validation.isTypeString(input.otherStuff, 'otherStuff')
          })
          .then(function() {
            return validation.stringHasLength(input.otherStuff, 'otherStuff')
          })
          .then(function() {
            return new Promise(function(resolve, reject) {
              db.queryOneData(dbobj, {
                  date: input.date
                },
                collection,
                function(result) {
                  if (result == null) {
                    resolve({})
                  } else {
                    reject('menuItem already exists')
                  }
                }) // db.queryOneData
            })
          }) // Promise
          .then(function() {
            return db.insertData(dbobj, collection, input)
              .then(function(result) {
                return returnValuePromise(result)
              })
              .catch(function(err) { // Inner Promise Chain
                dbobj.close()
                throw err
              })
          })
      })
  },
  tempAdd: function(input) {
    const time = new Date()
    // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    var collection = 'temperatues'
    return connectPromise
      .then(function(dbobj) {
        return validation.isNotUndefined(input, 'Input')
          .then(function() {
            return validation.isNotNull(input, 'Input')
          })
          .then(function() {
            if (!('utc_timestamp' in input)) {
              input.utc_timestamp = time.toISOString()
            }
            return validation.isTypeString(input.id, 'id')
              .then(function() {
                return validation.stringHasLength(input.id, 'id')
              })
              .then(function() {
                return validation.hasProperty(input, 't')
              })
              .then(function() {
                return validation.isTypeNumber(input.t, 't')
              })
              .then(function() {
                return temperatureModel(input)
              })
              .then(function(temperature) {
                return checkDupesPromise(configImport, db, dbobj, {
                  sensorId: temperature.sensorId
                }, {
                  utc_timestamp: -1
                }, collection, 'tempInFarenheit', temperature)
              })
              .then(function(result, temperature) {
                return insertDataPromise(result, temperature, db, dbobj, collection)
              })
              .then(function(result) {
                dbobj.close()
                return returnValuePromise(result)
              })
              .catch(function(err) {
                dbobj.close()
                throw err
              })
          })
      })
  },
  doorAdd: function(input) {
    const time = new Date()
    // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    var collection = 'doors'
    return connectPromise
      .then(function(dbobj) {
        return validation.isNotUndefined(input, 'Input')
          .then(function() {
            return validation.isNotNull(input, 'Input')
          })
          .then(function() {
            if (!('utc_timestamp' in input)) {
              input.utc_timestamp = time.toISOString()
            }
            return validation.isTypeString(input.sensorId, 'sensorId')
              .then(function() {
                return validation.stringHasLength(input.sensorId, 'sensorId')
              })
              .then(function() {
                return validation.hasProperty(input, 'isOpen')
              })
              .then(function() {
                return validation.isTypeBoolean(input.isOpen, 'isOpen')
              })
              .then(function() {
                return doorModel(input)
              })
              .then(function(door) {
                return checkDupesPromise(configImport, db, dbobj, {
                  sensorId: door.sensorId
                }, {
                  utc_timestamp: -1
                }, collection, 'isopen', door)
              })
              .then(function(result, door) {
                return insertDataPromise(result, door, db, dbobj, collection)
              })
              .then(function(result) {
                dbobj.close()
                return returnValuePromise(result)
              })
              .catch(function(err) { // Inner Promise Chain
                dbobj.close()
                throw err
              })
          })
      })
  }
}
}
