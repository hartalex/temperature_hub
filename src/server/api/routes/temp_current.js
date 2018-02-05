require('es6-promise').polyfill()
require('isomorphic-fetch')
const db = require('../db/mongodb')()
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
              if (new Date() - new Date(temp.utc_timestamp) > 5 * 60000) {
                temp.outdated = true;
              } else {
                temp.outdated = false;
              }
              delete temp._id
              retval.push(temp)
            }
            dbobj.close()
            resolve()
          })
        })
      })
      ).then(function () {
        res.json(retval)
      })
    }).catch(function (err) {
      res.json([])
    })
  }).catch(function (err) {
    res.json([])
  })
}
