const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    if (err == null) {
      db.querydistinctData(dbobj, 'sensorId', 'temperatures', function (temps) {
        db.queryData(dbobj, {}, 'sensors', function (sensors) {
          var array = []
          temps.forEach(function (temp) {
            var obj = {
              sensorId: temp
            }
            sensors.forEach(function (sensor) {
              if (temp === sensor.sensorId) {
                obj.name = sensor.name
              }
            })
            array.push(obj)
          })
          res.json(array)
          dbobj.close()
        })
      })
    } else {
      console.log('Error finding sensors in mongo db')
      console.log(err)
      res.json([])
    }
  })
}
