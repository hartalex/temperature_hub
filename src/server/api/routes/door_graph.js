const db = require('../db/mongodb')()
const durational_req_res = require('./durational_req_res')

function getAggregateQuery (lastOldestTime, timeStampCompareLength) {
  return [{
    '$match': {
      utc_timestamp: {
        '$gt': lastOldestTime
      }
    }
  },
  {
    '$group': {
      '_id': {
        'minute': {
          '$substr': ['$utc_timestamp', 0, timeStampCompareLength]
        }
      },
      'results': {
        $push: {
          'sensorId': '$sensorId',
          'isOpen': '$isOpen'
        }
      }
    }
  },
  {
    '$sort': {
      '_id.minute': 1
    }
  }
  ]
}

var finddoorsLastXMonths = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * 30 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime)
}

var finddoorsLastXDays = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime)
}

var finddoorsLastXHours = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime)
}

var doAggregateQuery = function (dbobj,x, callback, lastOldestTime) {
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, 16), 'doors',
  function (objs) {
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
    callback(firstObjects.concat(objs))
  })
}


module.exports = durational_req_res(finddoorsLastXHours, finddoorsLastXDays, finddoorsLastXMonths)
