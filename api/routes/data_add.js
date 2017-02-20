const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    const time = new Date()
    if (err == null) {
      var input = req.body
      console.log(input)
      if (typeof input === 'undefined') {
        console.log('Error request body is undefined')
        res.json({
          result: 'fail',
          reason: 'Request Body is Undefined'
        })
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
                    if (result != null && result.result.n > 0) {
                      res.json({
                        result: 'ok'
                      })
                    } else {
                      res.status(500)
                      res.json({
                        result: 'fail'
                      })
                    }
                    dbobj.close()
                  })
                } else {
                  console.log('Error t property is not a number')
                  res.status(500)
                  res.json({
                    result: 'fail',
                    reason: 'Property t is not a number'
                  })
                }
              } else {
                console.log('Error json object is missing the t property')
                res.status(500)
                res.json({
                  result: 'fail',
                  reason: 'Missing t property'
                })
              }
            } else {
              console.log('Error id property cannot be empty')
              res.status(500)
              res.json({
                result: 'fail',
                reason: 'Property id is an empty string'
              })
            }
          } else {
            console.log('Error id property is not a string')
            res.status(500)
            res.json({
              result: 'fail',
              reason: 'Property id is not a string'
            })
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
                  db.insertData(dbobj, 'doors', data, function (result) {
                    if (result != null && result.result.n > 0) {
                      res.json({
                        result: 'ok'
                      })
                    } else {
                      res.status(500)
                      res.json({
                        result: 'fail'
                      })
                    }
                    dbobj.close()
                  })
                } else {
                  console.log('Error isOpen property is not a boolean')
                  res.status(500)
                  res.json({
                    result: 'fail',
                    reason: 'Property isOpen is not a boolean'
                  })
                }
              } else {
                console.log('Error json object is missing the isOpen property')
                res.status(500)
                res.json({
                  result: 'fail',
                  reason: 'Property isOpen is missing'
                })
              }
            } else {
              console.log('Error sensorId property cannot be empty')
              res.status(500)
              res.json({
                result: 'fail',
                reason: 'Property sensorId is an empty string'
              })
            }
          } else {
            console.log('Error sensorId property is not a string')
            res.status(500)
            res.json({
              result: 'fail',
              reason: 'Property sensorId is not a string'
            })
          }
        } else {
          console.log('Error json object is missing the sensorId property')
          res.status(500)
          res.json({
            result: 'fail',
            reason: 'Property id is missing'
          })
        }
      }
    } else {
      console.log('Error connecting to mongo db')
      console.log(err)
      res.status(500)
      res.json({
        result: 'fail'
      })
    }
  })
}
