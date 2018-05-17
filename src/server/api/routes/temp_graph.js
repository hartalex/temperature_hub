const db = require('../db/mongodb')()
const durational_req_res = require('./durational_req_res')

function getAggregateQuery (lastOldestTime, timeStampCompareLength) {
  return [{
    '$match': {
      tempInFarenheit: {
        '$lt': 185
      },
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
        },
        'sensorId': '$sensorId'
      },
      'tempInFarenheit': {$avg: '$tempInFarenheit'}
    }
  },
  {
    '$group': {
      '_id': { 'minute': '$_id.minute' },
      'results': {
        $push: {
          'sensorId': '$_id.sensorId',
          'tempInFarenheit': '$tempInFarenheit'
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

var findTemperaturesLastXMonths = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * 30 * x * 1000)).toISOString()
  const timeStampCompareLength = 10
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (error, objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
      objs[i]._id.minute += 'T00:00'
    }
    callback(error, firstObjects.concat(objs))
  })
}

var findTemperaturesLastXDays = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * x * 1000)).toISOString()
  const timeStampCompareLength = 13
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (error, objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
      objs[i]._id.minute += ':00'
    }
    callback(error, firstObjects.concat(objs))
  })
}

var findTemperaturesLastXHours = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (error, objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
    }
    callback(error, firstObjects.concat(objs))
  })
}

module.exports = durational_req_res(findTemperaturesLastXHours, findTemperaturesLastXDays, findTemperaturesLastXMonths)
