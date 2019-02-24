import { convertToDoor } from './models/doorModel.js'
import { convertToTemperature } from './models/temperatureModel.js'
const configImport = require('../../config')
const validation = require('./validation')
const slackPost = require('./slack')
const logging = require('winston')

export async function checkDupesPromise (config, db, dbobj, query, sort, collection, dupeObject, dupeProp) {
  return new Promise((resolve, reject) => {
    if (config.NoDuplicateData && config.NoDuplicateData === true) {
      db.queryLastData(dbobj, query, sort, collection, (err, existingData) => {
        if (err) {
          reject(err)
        } else {
          if (existingData != null) {
            var match = true
            var prop
            for (prop in dupeProp) {
              match = match && existingData[prop] !== dupeObject[prop]
            }
            if (match) {
              resolve(dupeObject)
            } else {
              reject('duplicate')
            }
          } else {
            resolve(dupeObject)
          }
        }
      })
    } else {
      resolve(dupeObject)
    }
  })
}

const insertDataPromise = (data, db, dbobj, collection, obj) => {
  return db.insertData(dbobj, collection, data).then(() => {
    return new Promise((resolve, reject) => {
      resolve(obj)
    })
  })
}

export function init (db, dbobj, config, slack) {
  if (typeof config == 'undefined') {
    config = configImport
  }
  if (typeof slack == 'undefined') {
    slack = slackPost(config.slackUrl)
  }
  return {
    menuAdd: (input) => {
      const collection = 'menu'
      // Use connect method to connect to the Server
      return validation
        .isNotUndefined(input, 'Input')
        .then(() => {
          return validation.isNotNull(input, 'Input')
        })
        .then(() => {
          return validation.hasProperty(input, 'date')
        })
        .then(() => {
          return validation.isTypeString(input.date, 'date')
        })
        .then(() => {
          return validation.stringHasLength(input.date, 'date')
        })
        .then(() => {
          return validation.hasProperty(input, 'firstOption')
        })
        .then(() => {
          return validation.isTypeString(input.firstOption, 'firstOption')
        })
        .then(() => {
          return validation.stringHasLength(input.firstOption, 'firstOption')
        })
        .then(() => {
          return validation.hasProperty(input, 'secondOption')
        })
        .then(() => {
          return validation.isTypeString(input.secondOption, 'secondOption')
        })
        .then(() => {
          return validation.stringHasLength(input.secondOption, 'secondOption')
        })
        .then(() => {
          return validation.hasProperty(input, 'otherStuff')
        })
        .then(() => {
          return validation.isTypeString(input.otherStuff, 'otherStuff')
        })
        .then(() => {
          return validation.stringHasLength(input.otherStuff, 'otherStuff')
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            db.queryOneData(
              dbobj,
              {
                date: input.date
              },
              collection,
              (result) => {
                if (result == null) {
                  resolve(input)
                } else {
                  reject('menuItem already exists')
                }
              }
            ) // db.queryOneData
          })
        }) // Promise
        .then(() => {
          return insertDataPromise(input, db, dbobj, collection, input)
        })
    },
    tempAdd: (input) => {
      const time = new Date()
      // Use connect method to connect to the Server
      var collection = 'temperatures'
      return validation
        .isNotUndefined(input, 'Input')
        .then(() => {
          return validation.isNotNull(input, 'Input')
        })
        .then(() => {
          if (!('utc_timestamp' in input)) {
            input.utc_timestamp = time.toISOString()
          }
          return validation
            .isTypeString(input.id, 'id')
            .then(() => {
              return validation.stringHasLength(input.id, 'id')
            })
            .then(() => {
              return validation.hasProperty(input, 't')
            })
            .then(() => {
              return validation.isTypeNumber(input.t, 't')
            })
            .then(() => {
              return convertToTemperature(input)
            })
            .then((temperature) => {
              return checkDupesPromise(
                config,
                db,
                dbobj,
                {
                  sensorId: temperature.sensorId
                },
                {
                  utc_timestamp: -1
                },
                collection,
                temperature,
                { tempInFarenheit: 0, humidity: 0 }
              )
            })
            .then((temperature) => {
              return insertDataPromise(temperature, db, dbobj, collection, input)
            })
        })
    },
    doorAdd: (input) => {
      logging.log('debug', 'data.DoorAdd', input)
      const time = new Date()
      // Use connect method to connect to the Server
      var collection = 'doors'
      return validation
        .isNotUndefined(input, 'Input')
        .then(() => {
          return validation.isNotNull(input, 'Input')
        })
        .then(() => {
          if (!('utc_timestamp' in input)) {
            input.utc_timestamp = time.toISOString()
          }
          return validation
            .isTypeString(input.sensorId, 'sensorId')
            .then(() => {
              return validation.stringHasLength(input.sensorId, 'sensorId')
            })
            .then(() => {
              return validation.hasProperty(input, 'isOpen')
            })
            .then(() => {
              return validation.isTypeBoolean(input.isOpen, 'isOpen')
            })
            .then(() => {
              logging.log('debug', 'Modeling Door', input)
              return convertToDoor(input)
            })
            .then((door) => {
              logging.log('debug', 'Checking Dupes Promise', door)
              return checkDupesPromise(
                config,
                db,
                dbobj,
                {
                  sensorId: door.sensorId
                },
                {
                  utc_timestamp: -1
                },
                collection,
                door,
                { isOpen: 0 }
              )
            })
            .then((door) => {
              logging.log('debug', 'querying Last Data', door)
              return new Promise((resolve, reject) => {
                db.queryLastData(
                  dbobj,
                  {
                    sensorId: door.sensorId
                  },
                  {
                    utc_timestamp: -1
                  },
                  collection,
                  (err, existingData) => {
                    if (err) {
                      reject(err)
                    } else {
                      if (existingData == null || (existingData != null && existingData.isOpen !== door.isOpen)) {
                        logging.log('debug', 'door has changed', door)
                        resolve({ changed: true, door: door })
                      } else {
                        logging.log('debug', 'door has NOT changed')
                        resolve({ changed: false, door: door })
                      }
                    }
                  }
                )
              })
            })
            .then((obj) => {
              // get door sensor real name from database
              return new Promise((resolve, reject) => {
                if (obj.changed) {
                  db.queryOneData(
                    dbobj,
                    {
                      sensorId: obj.door.sensorId
                    },
                    'sensors',
                    (err, doordb) => {
                      if (err) {
                        reject(err)
                      } else {
                        if (doordb == null) {
                          logging.log('debug', 'did NOT find a name for sensor door', obj.door.sensorId)
                        } else {
                          logging.log('debug', 'did find a name for door sensor', doordb.name)
                          obj.name = doordb.name
                        }
                        resolve(obj)
                      }
                    }
                  )
                } else {
                  logging.log('debug', 'door has not changed')
                  resolve(obj)
                }
              })
            })
            .then((obj) => {
              logging.log('debug', 'inserting Data Promise', obj.door)
              return insertDataPromise(obj.door, db, dbobj, collection, obj)
            })
            .then((obj) => {
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
                retval = slack.SlackPost(name + ' is now ' + openstring, undefined, obj.door)
              } else {
                logging.log('debug', 'NOT sending slack message about door', obj.door)
                retval = new Promise((resolve, reject) => {
                  resolve(obj.door)
                })
              }
              return retval
            })
        })
    }
  }
}
