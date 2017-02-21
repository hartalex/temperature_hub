const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = { dataAdd: function (input, output) {
  output.result = 'fail'
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    const time = new Date()
    if (err == null) {
      console.log(input)
      if (typeof input === 'undefined') {
        console.log('Error request body is undefined')
        output.reason = 'Request Body is Undefined'
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
                  console.log('Error t property is not a number')
                  output.reason = 'Property t is not a number'
                }
              } else {
                console.log('Error json object is missing the t property')
                output.reason = 'Missing t property'
              }
            } else {
              console.log('Error id property cannot be empty')
              output.reason = 'Property id is an empty string'
            }
          } else {
            console.log('Error id property is not a string')
            output.reason = 'Property id is not a string'
          }
        } else
      // door data
      if ('sensorId' in input) {
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
                  console.log(existingData)
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
                console.log('Error isOpen property is not a boolean')
                output.reason = 'Property isOpen is not a boolean'
              }
            } else {
              console.log('Error json object is missing the isOpen property')
              output.reason = 'Property isOpen is missing'
            }
          } else {
            console.log('Error sensorId property cannot be empty')
            output.reason = 'Property sensorId is an empty string'
          }
        } else {
          console.log('Error sensorId property is not a string')
          output.reason = 'Property sensorId is not a string'
        }
      } else {
        console.log('Error json object is missing the sensorId property')
        output.reason = 'Property id is missing'
      }
      }
    } else {
      console.log('Error connecting to mongo db')
      console.log(err)
    }
  })
}
}
