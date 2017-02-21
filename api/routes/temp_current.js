require('es6-promise').polyfill()
require('isomorphic-fetch')
const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  fetch('http://localhost:8811/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  }).then(function (sensorjson) {
    var retval = []
    Promise.all(sensorjson).then(sensor => {
      console.log(sensor)
      db.connect(dbUrl, function (err, dbobj) {
        if (err == null) {
          db.queryLastData(dbobj, {sensorId: sensor.sensorId}, {utc_timestamp: -1}, 'temperatures', function (temp) {
            if (temp != null) {
              temp.sensorName = sensor.name
              retval.push(temp)
            } else {
              console.log('Unable to find temperature for that sensor')
              console.log(sensor.sensorId)
            }
            dbobj.close()
          })
        } else {
          console.log('Error connecting to mongo db')
          console.log(err)
        }
      })
    }).then(function () {
      console.log(retval)
      res.json(retval)
    }).catch(function (err) {
      console.log(err)
      res.json([])
    })
  }).catch(function (err) {
    console.log(err)
    res.json([])
  })
}
