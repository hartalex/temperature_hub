require('es6-promise').polyfill()
require('isomorphic-fetch')
const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  fetch('http://localhost:80/temp/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  }).then(function (sensorjson) {
    var retval = []

    var connectPromise = db.connect(dbUrl)
    connectPromise.then(function (dbobj) {
      Promise.all(sensorjson.map(function (sensor) {
        return new Promise(function (resolve, reject) {
          db.queryLastData(dbobj, {sensorId: sensor.sensorId}, {utc_timestamp: -1}, 'temperatures', function (temp) {
            if (temp != null) {
              temp.sensorName = sensor.name
              delete temp._id
              retval.push(temp)
            } else {
              console.log('Unable to find temperature for that sensor')
              console.log(sensor.sensorId)
            }
            dbobj.close()
            resolve()
          })
        })
      })
    ).then(function () {
      console.log(retval)
      res.json(retval)
    })
    }).catch(function (err) {
      console.log(err)
      res.json([])
    })
  }).catch(function (err) {
    console.log(err)
    res.json([])
  })
}
