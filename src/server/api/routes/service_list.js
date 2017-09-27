const db = require('../db/mongodb')
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      db.queryData(dbobj, {}, 'services', function (svcs) {
        for (var i = 0; i < svcs.length; i++) {
          delete svcs[i]._id
        }
        dbobj.close()
        resolve(svcs)
      })
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    res.json([])
  })
}
