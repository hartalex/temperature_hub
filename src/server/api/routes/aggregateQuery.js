const db = require('../db/mongodb')()
module.exports =  function (dbobj, x, callback, lastOldestTime, getAggregateQuery, collection) {
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, 16), collection,
  function (error, objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        for (var x = 0; x < obj.results.length; x++) {
          obj.results[x].isOpen = !(obj.results[x]).isOpen
        }
        firstObjects.push(obj)
      }
    }
    callback(error, firstObjects.concat(objs))
  })
}
