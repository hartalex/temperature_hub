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

var findTemperaturesLastXDays = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * 24 * x * 1000)).toISOString()
  const timeStampCompareLength = 13
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures',
  function (objs) {
    objs.forEach(function (obj) {
      obj._id.minute += ':00'
    })
    callback(objs)
  })
}

var findTemperaturesLastXHours = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - (3600 * x * 1000)).toISOString()
  const timeStampCompareLength = 16
  db.queryAggregateData(dbobj, getAggregateQuery(lastOldestTime, timeStampCompareLength), 'temperatures', callback)
}

module.exports = function (req, res) {
  var duration
  if ('duration' in req.params) {
    duration = req.params.duration
  }
  duration = validateDuration(duration)
  // Use connect method to connect to the Server
  db.connect(dbUrl, function (err, dbobj) {
    if (err == null) {
      if (duration === '1h') {
        findTemperaturesLastXHours(dbobj, 1, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '12h') {
        findTemperaturesLastXHours(dbobj, 12, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '24h') {
        findTemperaturesLastXHours(dbobj, 24, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '3d') {
        findTemperaturesLastXDays(dbobj, 3, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '7d') {
        findTemperaturesLastXDays(dbobj, 7, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '14d') {
        findTemperaturesLastXDays(dbobj, 14, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else if (duration === '28d') {
        findTemperaturesLastXDays(dbobj, 28, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      } else {
        console.log('Duration could not be handled')
        console.log(duration)
        res.json([])
      }
    } else {
      console.log('Error connecting to mongo db')
      console.log(err)
      res.json([])
    }
  })
}

function validateDuration (duration) {
  const validDurations = ['1h', '12h', '24h', '3d', '7d', '14d', '28d']
  var retval = validDurations[0]
  if (validDurations.indexOf(duration) !== -1) {
    retval = validDurations[validDurations.indexOf(duration)]
    console.log('Duration is valid')
  }
  return retval
}
