const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    if (err == null) {
      var temp = req.body
      console.log(temp)
      if (typeof temp === 'undefined') {
        console.log('Error request body is undefined')
        res.json({
          result: 'fail',
          reason: 'Request Body is Undefined'
        })
      } else {
        if ('id' in temp) {
          if (typeof temp.id === 'string') {
            if (temp.id.length > 0) {
              if ('t' in temp) {
                if (typeof temp.t === 'number') {
                  var temperature = {}
                  temperature.sensorId = temp.id
                  temperature.tempInFarenheit = temp.t
                  if (!('utc_timestamp' in temp)) {
                    var time = new Date()
                    temperature.utc_timestamp = time.toISOString()
                  } else {
                    temperature.utc_timestamp = temp.utc_timestamp
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
        } else {
          console.log('Error json object is missing the id property')
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
