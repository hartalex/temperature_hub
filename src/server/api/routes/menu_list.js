const db = require('../db/mongodb')()
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  return connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      if ('date' in req.params) {
        query = {
          date: req.params.date
        }
      }
      db.queryData(dbobj, query, 'menu', function (menu) {
        for (var i = 0; i < menu.length; i++) {
          delete menu[i]._id
        }
        dbobj.close()
        resolve(menu)
      })
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    res.json([])
  })
}
