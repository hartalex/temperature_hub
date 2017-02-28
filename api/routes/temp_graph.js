const db = require('../db/mongodb')
const dbUrl = require('../db/url')

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
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
      objs[i]._id.minute += 'T00:00'
    }
    callback(firstObjects.concat(objs))
  })
}

var findTemperaturesLastXDays = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * x * 1000)).toISOString()
  const timeStampCompareLength = 13
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
      objs[i]._id.minute += ':00'
    }
    callback(firstObjects.concat(objs))
  })
}

var findTemperaturesLastXHours = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        firstObjects.push(obj)
      }
    }
    callback(firstObjects.concat(objs))
  })
}

module.exports = function (req, res) {
  var duration
  if ('duration' in req.params) {
    duration = req.params.duration
  }
  duration = validateDuration(duration)
  // Use connect method to connect to the Server
  var connectPromise = db.connect(dbUrl)
  connectPromise.then(function (dbobj) {
    return new Promise(function (resolve, reject) {
      if (duration === '1h') {
        findTemperaturesLastXHours(dbobj, 1, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '12h') {
        findTemperaturesLastXHours(dbobj, 12, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '24h') {
        findTemperaturesLastXHours(dbobj, 24, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '3d') {
        findTemperaturesLastXDays(dbobj, 3, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '7d') {
        findTemperaturesLastXDays(dbobj, 7, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '14d') {
        findTemperaturesLastXDays(dbobj, 14, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '28d') {
        findTemperaturesLastXDays(dbobj, 28, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '1m') {
        findTemperaturesLastXMonths(dbobj, 1, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '3m') {
        findTemperaturesLastXMonths(dbobj, 3, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '6m') {
        findTemperaturesLastXMonths(dbobj, 6, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '12m') {
        findTemperaturesLastXMonths(dbobj, 12, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else {
        dbobj.close()
        reject('Duration could not be handled' + duration)
      }
    })
  }).then(function (result) {
    res.json(result)
  })
  .catch(function (err) {
    console.log(err)
    res.json([])
  })
}

function validateDuration (duration) {
  const validDurations = ['1h', '12h', '24h', '3d', '7d', '14d', '28d', '1m', '3m', '6m', '12m']
  var retval = validDurations[0]
  if (validDurations.indexOf(duration) !== -1) {
    retval = validDurations[validDurations.indexOf(duration)]
    console.log('Duration is valid')
  }
  return retval
}
