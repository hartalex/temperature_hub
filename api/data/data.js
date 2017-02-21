const dbUrl = require('../db/url')

module.exports = {
  init: function (mydb) {
    this.db = mydb
  },
  dataAdd: function (input, output) {
    output.result = 'fail'
    var db = this.db
  // Use connect method to connect to the Server
    db.connect(dbUrl, function (err, dbobj) {
      const time = new Date()
      if (err == null) {
        if (typeof input === 'undefined') {
          output.reason = 'Input is undefined'
        } else if (input === null) {
          output.reason = 'Input is null'
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
                    db.insertData(dbobj, 'temperatures', temperature, function (result) {
                      dbobj.close()
                      if (result != null && result.result.n > 0) {
                        output.result = 'ok'
                      }
                    })
                  } else {
                    output.reason = 'Property t is not a number'
                  }
                } else {
                  output.reason = 'Missing t property'
                }
              } else {
                output.reason = 'Property id is an empty string'
              }
            } else {
              output.reason = 'Property id is not a string'
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
                    db.queryLastData(dbobj, {sensorId: data.sensorId}, {utc_timestamp: -1}, 'doors', function (existingData) {
                      if (existingData == null || (existingData != null && existingData.isOpen !== data.isOpen)) {
                        db.insertData(dbobj, 'doors', data, function (result) {
                          dbobj.close()
                          if (result != null && result.result.n > 0) {
                            output.result = 'ok'
                          }
                        })
                      } else {
                        dbobj.close()
                        output.result = 'ok'
                      }
                    })
                  } else {
                    output.reason = 'Property isOpen is not a boolean'
                  }
                } else {
                  output.reason = 'Property isOpen is missing'
                }
              } else {
                output.reason = 'Property sensorId is an empty string'
              }
            } else {
              output.reason = 'Property sensorId is not a string'
            }
          } else {
            output.reason = 'Property id/sensorId is missing'
          }
        }
      } else {
        output.reason = 'Error connecting to mongo db'
        output.result = 'fail'
      }
    })
  },
  
}
