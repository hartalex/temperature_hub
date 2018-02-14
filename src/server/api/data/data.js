const dbUrl = require('../db/url')
const configImport = require('../../config')
const validation = require('./validation')
const temperatureModel = require('./models/temperatureModel')
const doorModel = require('./models/doorModel')
const slackPost = require('./slack')
const logging = require('winston')

const checkDupesPromise = function(config, db, dbobj, query, sort, collection, dupeProp, dupeObject) {
  return new Promise(function(resolve, reject) {
    if (config.NoDuplicateData && config.NoDuplicateData === true) {
      db.queryLastData(dbobj, query, sort, collection, function(existingData) {
        if (existingData == null || (existingData != null && existingData[dupeProp] !== dupeObject[dupeProp])) {
          resolve(dupeObject)
        } else {
          reject('duplicate')
        }
      })
    } else {
      resolve(dupeObject)
    }
  })
}

const insertDataPromise = function(data, db, dbobj, collection, obj) {
  return db.insertData(dbobj, collection, data).then( function() {
    return new Promise(function(resolve, reject) {
      resolve(obj)
    })
  })
}

module.exports = function(db, config, slack) {
  if (typeof config == 'undefined') {
    config = configImport
  }
  if (typeof slack == 'undefined') {
    slack = slackPost(config.slackUrl)
  }
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

            }).then(function() {
              return {
                result: 'ok'
              }
            }).catch(function(err) { // Inner Promise Chain
              dbobj.close()
              throw err
            })
        })
    },
    tempAdd: function(input) {
      const time = new Date()
      // Use connect method to connect to the Server
      var connectPromise = db.connect(dbUrl)
      var collection = 'temperatures'
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
                  return checkDupesPromise(config, db, dbobj, {
                    sensorId: temperature.sensorId
                  }, {
                    utc_timestamp: -1
                  }, collection, 'tempInFarenheit', temperature)
                })
                .then(function(temperature) {
                  return insertDataPromise(temperature, db, dbobj, collection)
                }).then(function() {
                  return {
                    result: 'ok'
                  }
                })
                .catch(function(err) {
                  dbobj.close()
                  throw err
                })
            })
        })
    },
    doorAdd: function(input) {
      logging.log('debug', 'data.DoorAdd', input)
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
                  logging.log('debug', 'Modeling Door', input)
                  return doorModel(input)
                })
                .then(function(door) {
                  logging.log('debug', 'Checking Dupes Promise', door)
                  return checkDupesPromise(config, db, dbobj, {
                    sensorId: door.sensorId
                  }, {
                    utc_timestamp: -1
                  }, collection, 'isOpen', door)
                }).then(function(door) {
                  logging.log('debug', 'querying Last Data', door)
                  return new Promise(function(resolve, reject) {
                    db.queryLastData(dbobj, {
                      sensorId: door.sensorId
                    }, {
                      utc_timestamp: -1
                    }, collection, function(existingData) {
                      if (existingData == null || (existingData != null && existingData.isOpen !== door.isOpen)) {
                        logging.log('debug', 'door has changed', door)
                        resolve({changed:true, door:door})
                      } else {
                        logging.log('debug', 'door has NOT changed')
                        resolve({changed:false, door:door})
                      }
                    })
                  })
                }).then(function(obj) {
                  // get door sensor real name from database
                  return new Promise(function(resolve, reject) {
                    if (obj.changed) {
                      db.queryOneData(dbobj, {
                        sensorId: obj.door.sensorId
                      }, 'sensors', function(doordb) {
                        if (doordb == null) {
                          logging.log('debug', 'did NOT find a name for sensor door', obj.door.sensorId)
                        } else {
                          logging.log('debug', 'did find a name for door sensor', doordb.name)
                          obj.name = doordb.name
                        }
                        resolve(obj)
                      })
                    } else {
                      logging.log('debug', 'door has not changed')
                      resolve(obj)
                    }
                  })
                }).then(function(obj) {
                  logging.log('debug', 'inserting Data Promise', obj.door)
                  return insertDataPromise(obj.door, db, dbobj, collection, obj)
                }).then(function(obj) {
                  var retval
                  if (obj.changed) {
                    var openstring = 'closed'
                    var name = obj.door.sensorId
                    if (obj.door.isOpen) {
                      openstring = 'open'
                    }
                    if (obj.name) {
                      name = obj.name
                    }
                    logging.log('debug', 'sending slack message about door', obj.door)
                    retval = slack.SlackPost(name + ' is now ' + openstring, undefined, obj)
                  } else {
                    logging.log('debug', 'NOT sending slack message about door', obj.door)
                    retval = new Promise(function(resolve, reject) {
                      resolve(obj)
                    })
                  }
                  return retval
                }).then(function() {
                  return {
                    result: 'ok'
                  }
                }).catch(function(err) { // Inner Promise Chain
                  dbobj.close()
                  throw err
                })
            })
        })
    }
  }
}
