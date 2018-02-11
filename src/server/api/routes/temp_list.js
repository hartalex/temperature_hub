const db = require('../db/mongodb')()
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      if ('sensorId' in req.params) {
        query = {
          sensorId: req.params.sensorId
        }
      }
      db.queryData(dbobj, query, 'temperatures', function (temps) {
        for (var i = 0; i < temps.length; i++) {
          delete temps[i]._id
        }
        dbobj.close()
        resolve(temps)
      })
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    console.error(err)
    res.json([])
  })
}
