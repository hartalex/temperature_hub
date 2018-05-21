const db = require('../db/mongodb')()
module.exports = {
  doAggregateQuery: function (dbobj, x, callback, lastOldestTime, getAggregateQuery, collection) {
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
  },
  months: function(x) { return (3600 * 24 * 30 * x * 1000)},
  days: function(x) { return (3600 * 24 * x * 1000)},
  hours: function(x) { return (3600 * x * 1000)},
  findDataByTime: function (timeFunction, getAggregateQuery, collection) {
    return function(dbobj, x, callback) {
      const lastOldestTime = new Date(new Date() - timeFunction(x)).toISOString()
      this.doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, collection)
    }
  }
}
