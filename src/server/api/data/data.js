const dbUrl = require('../db/url')
const mongoDb = require('../db/mongodb')
const configImport = require('../../config')

function insertDataWithPromise (db, dbobj, data, collection, resolve, reject) {
  var insertPromise = db.insertData(dbobj, collection, data)
  insertPromise.then(function (result) {
    dbobj.close()
    resolve({result: {n: 1}})
  }).catch(function (err) {
    dbobj.close()
    reject(err)
  })
}

module.exports = {
  db: mongoDb,
  config: configImport,
  menuAdd: function (input) {
    var db = this.db
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
          if ('date' in input) {
            if (typeof input.date === 'string') {
              if (input.date.length > 0) {
                if ('firstOption' in input) {
                  if (typeof input.firstOption === 'string') {
                    if (input.firstOption.length > 0) {
                      if ('secondOption' in input) {
                        if (typeof input.secondOption === 'string') {
                          if (input.secondOption.length > 0) {
                            
                            if ('otherStuff' in input) {
                              if (typeof input.otherStuff === 'string') {
                                if (input.otherStuff.length > 0) {

                                  db.queryOneData(dbobj, {
                                    date: input.date
                                  }, 'menu', function (result) {
                                    if (result == null) {
                                      insertDataWithPromise(db, dbobj, input, 'menu', resolve, reject)
                                    } else {
                                      dbobj.close()
                                      reject('menuItem already exists')
                                    }
                                  })
                                } else {
                                  dbobj.close()
                                  reject('Property otherStuff is an empty string')
                                }
                              } else {
                                dbobj.close()
                                reject('Property otherStuff is not a string')
                              }
                            } else {
                              dbobj.close()
                              reject('Missing otherStuff property')
                            }
                          } else {
                            dbobj.close()
                            reject('Property secondOption is an empty string')
                          }
                        } else {
                          dbobj.close()
                          reject('Property secondOption is not a string')
                        }
                      } else {
                        dbobj.close()
                        reject('Missing secondOption property')
                      }
                    } else {
                      dbobj.close()
                      reject('Property firstOption is an empty string')
                    }
                  } else {
                    dbobj.close()
                    reject('Property firstOption is not a string')
                  }
                } else {
                  dbobj.close()
                  reject('Missing firstOption property')
                }
              } else {
                dbobj.close()
                reject('Property date is an empty string')
              }
            } else {
              dbobj.close()
              reject('Property date is not a string')
            }
          } else {
            dbobj.close()
            reject('Property date is missing')
          }
        }
          })
        }).then(function (result) {
          return new Promise(function (resolve, reject) {
            if (result != null && result.result.n > 0) {
              resolve({result: 'ok'})
            }
          })
        })
  },
  dataAdd: function (input) {
    var db = this.db
    var config = this.config
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
                          insertDataWithPromise(db, dbobj, temperature,'temperatures', resolve, reject)
                        } else {
                          dbobj.close()
                          resolve({result: {n: 1}, reason: 'duplicate'})
                        }
                      })
                    } else {
                      insertDataWithPromise(db, dbobj, temperature, 'temperatures', resolve, reject)
                    }
                  } else {
                    dbobj.close()
                    reject('Property t is not a number')
                  }
                } else {
                  dbobj.close()
                  reject('Property t is missing')
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
                          insertDataWithPromise(db, dbobj, data, 'doors', resolve, reject)
                        } else {
                          dbobj.close()
                          resolve({result: {n: 1}, reason: 'duplicate'})
                        }
                      })
                    } else {
                      insertDataWithPromise(db, dbobj, data, 'doors', resolve, reject)
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
          var retval = {result: 'ok'}
          if (result.reason) {
            retval.reason = result.reason
          }
          resolve(retval)
        }
      })
    })
  }
}
