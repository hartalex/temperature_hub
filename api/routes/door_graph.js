const db = require('../db/mongodb')
const dbUrl = require('../db/url')

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
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * 30 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'doors',
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        for (var x = 0; x < obj.results.length; x++) {
          obj.results[x].isOpen = !obj.results[x].isOpen
        }
        firstObjects.push(obj)
      }
      objs[i]._id.minute
    }
    callback(firstObjects.concat(objs))
  })
}

var finddoorsLastXDays = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'doors',
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        for (var x = 0; x < obj.results.length; x++) {
          obj.results[x].isOpen = !obj.results[x].isOpen
        }
        firstObjects.push(obj)
      }
      objs[i]._id.minute
    }
    callback(firstObjects.concat(objs))
  })
}

var finddoorsLastXHours = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'doors',
  function (objs) {
    var firstObjects = []
    for (var i = 0; i < objs.length; i++) {
      if (i === 0) {
        var obj = JSON.parse(JSON.stringify(objs[i]))
        obj._id.minute = lastOldestTime
        for (var x = 0; x < obj.results.length; x++) {
          obj.results[x].isOpen = !obj.results[x].isOpen
        }
        firstObjects.push(obj)
      }
      objs[i]._id.minute
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
        finddoorsLastXHours(dbobj, 1, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '12h') {
        finddoorsLastXHours(dbobj, 12, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '24h') {
        finddoorsLastXHours(dbobj, 24, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '3d') {
        finddoorsLastXDays(dbobj, 3, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '7d') {
        finddoorsLastXDays(dbobj, 7, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '14d') {
        finddoorsLastXDays(dbobj, 14, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '28d') {
        finddoorsLastXDays(dbobj, 28, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '1m') {
        finddoorsLastXMonths(dbobj, 1, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '3m') {
        finddoorsLastXMonths(dbobj, 3, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '6m') {
        finddoorsLastXMonths(dbobj, 6, function (temps) {
          dbobj.close()
          resolve(temps)
        })
      } else if (duration === '12m') {
        finddoorsLastXMonths(dbobj, 12, function (temps) {
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
