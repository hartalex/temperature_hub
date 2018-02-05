const db = require('../db/mongodb')()
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  return connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      if ('sensorId' in req.params) {
        query = {
          sensorId: req.params.sensorId
        }
      }
      db.queryData(dbobj, query, 'doors', function (doors) {
        for (var i = 0; i < doors.length; i++) {
          delete doors[i]._id
        }
        dbobj.close()
        resolve(doors)
      })
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    res.json([])
  })
}
