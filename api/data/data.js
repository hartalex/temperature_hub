const dbUrl = require('../db/url')
const mongoDb = require('../db/mongodb')
const config = require('../../config')

function insertTemperatures (db, dbobj, temperature, resolve, reject) {
  var insertPromise = db.insertData(dbobj, 'temperatures', temperature)
  insertPromise.then(function (result) {
    dbobj.close()
    resolve(result)
  }).catch(function (err) {
    dbobj.close()
    reject(err)
  })
}

function insertData (db, dbobj, data, resolve, reject) {
  var insertPromise = db.insertData(dbobj, 'doors', data)
  insertPromise.then(function (result) {
    dbobj.close()
    resolve(result)
  }).catch(function (err) {
    dbobj.close()
    reject(err)
  })
}

module.exports = {
  db: mongoDb,
  dataAdd: function (input) {
    var db = this.db
    const time = new Date()
  // Use connect method to connect to the Server
    var connectPromise = db.connect(dbUrl)
    return connectPromise.then(function (dbobj) {
      return new Promise(function (resolve, reject) {
        if (typeof input === 'undefined') {
          dbobj.close()
          reject('Input is undefined')
        } else if (input === null) {
          dbobj.close()
          reject('Input is null')
        } else {
          // temperatures
          if ('id' in input) {
            if (typeof input.id === 'string') {
              if (input.id.length > 0) {
                if ('t' in input) {
                  if (typeof input.t === 'number') {
                    var temperature = {}
                    temperature.sensorId = input.id
                    temperature.tempInFarenheit = input.t
                    if (!('utc_timestamp' in input)) {
                      temperature.utc_timestamp = time.toISOString()
                    } else {
                      temperature.utc_timestamp = input.utc_timestamp
                    }
                    if (config.NoDuplicateData && config.NoDuplicateData === true) {
                      db.queryLastData(dbobj, {sensorId: temperature.sensorId}, {utc_timestamp: -1}, 'temperatures', function (existingData) {
                        if (existingData == null || (existingData != null && existingData.tempInFarenheit !== temperature.tempInFarenheit)) {
                          insertTemperatures(db, dbobj, temperature, resolve, reject)
                        } else {
                          console.log('data didnot change')
                          dbobj.close()
                          resolve({result: {n: 1}})
                        }
                      })
                    } else {
                      insertTemperatures(db, dbobj, temperature, resolve, reject)
                    }
                  } else {
                    dbobj.close()
                    reject('Property t is not a number')
                  }
                } else {
                  dbobj.close()
                  reject('Missing t property')
                }
              } else {
                dbobj.close()
                reject('Property id is an empty string')
              }
            } else {
              dbobj.close()
              reject('Property id is not a string')
            }
          } else if ('sensorId' in input) {
            if (typeof input.sensorId === 'string') {
              if (input.sensorId.length > 0) {
                if ('isOpen' in input) {
                  if (typeof input.isOpen === 'boolean') {
                    var data = {}
                    data.sensorId = input.sensorId
                    data.isOpen = input.isOpen
                    if (!('utc_timestamp' in input)) {
                      data.utc_timestamp = time.toISOString()
                    } else {
                      data.utc_timestamp = input.utc_timestamp
                    }
                    if (config.NoDuplicateData && config.NoDuplicateData === true) {
                      db.queryLastData(dbobj, {sensorId: data.sensorId}, {utc_timestamp: -1}, 'doors', function (existingData) {
                        if (existingData == null || (existingData != null && existingData.isOpen !== data.isOpen)) {
                          insertData(db, dbobj, data, resolve, reject)
                        } else {
                          console.log('data didnot change')
                          dbobj.close()
                          resolve({result: {n: 1}})
                        }
                      })
                    } else {
                      insertData(db, dbobj, data, resolve, reject)
                    }
                  } else {
                    dbobj.close()
                    reject('Property isOpen is not a boolean')
                  }
                } else {
                  dbobj.close()
                  reject('Property isOpen is missing')
                }
              } else {
                dbobj.close()
                reject('Property sensorId is an empty string')
              }
            } else {
              dbobj.close()
              reject('Property sensorId is not a string')
            }
          } else {
            dbobj.close()
            reject('Property id/sensorId is missing')
          }
        }
      })
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        if (result != null && result.result.n > 0) {
          resolve({result: 'ok'})
        } else {
          reject('result was not inserted to database')
        }
      })
    })
  }
}
