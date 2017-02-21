const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    if (err == null) {
      db.querydistinctData(dbobj, 'sensorId', 'temperatures', function (temps) {
        console.log('temps:')
        console.log(temps)
        db.queryData(dbobj, {}, 'sensors', function (sensors) {
          console.log('sensors:')
          console.log(sensors)
          var array = []
          for (var i = 0; i < temps.length; i++) {
            var obj = {
              sensorId: temps[i]
            }
            for (var s = 0; s < sensors.length; s++) {
              if (temps[i] === sensors[s].sensorId) {
                obj.name = sensors[s].name
              }
            }
            array.push(obj)
          }
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
