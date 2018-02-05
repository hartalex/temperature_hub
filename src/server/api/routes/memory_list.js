const db = require('../db/mongodb')()
const dbUrl = require('../db/url')

module.exports = function (req, res) {
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  return connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      var query = {}
      var sort = { date: -1 }
      if ('date' in req.params) {
        query = {
          date:
          {
            '$lte': req.params.date
          }
        }
      }
      db.queryLastData(dbobj, query, sort, 'memory', function (memory) {
        if (memory) {
        for (var i = 0; i < memory.length; i++) {
          delete memory[i]._id
        }
      } else {
        memory = []
      }
        dbobj.close()

        resolve(memory)
      })
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    res.json([])
  })
}
