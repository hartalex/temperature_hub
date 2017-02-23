const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      db.querydistinctData(dbobj, 'sensorId', 'doors', function (temps) {
        console.log('found temps')
        console.log(temps)
        db.queryData(dbobj, {}, 'sensors', function (sensors) {
          console.log('found sensors')
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
          dbobj.close()
          resolve(array)
        })
      })
    })
  }).then(function (result) {
    console.log('success value')
    res.json(result)
  })
  .catch(function (err) {
    console.log('error caught')
    console.log(err)
    res.json([])
  })
}
