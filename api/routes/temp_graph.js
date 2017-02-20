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
        }
      },
      'results': {
        $push: {
          'tempInFarenheit': '$tempInFarenheit',
          'sensorId': '$sensorId'
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

var findTemperaturesLastXHours = function (dbobj, x, callback) {
  const currentTime = new Date()
  const lastOldestTime = new Date(currentTime - 3600 * x * 1000).toISOString()
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
      } else if (duration === '24h') {
        findTemperaturesLastXHours(dbobj, 24, function (temps) {
          res.json(temps)
          dbobj.close()
        })
      }
    } else {
      console.log('Error connecting to mongo db')
      console.log(err)
      res.json([])
    }
  })
}

function validateDuration (duration) {
  var validDurations = ['1h', '24h', '3d', '7d']
  var retval = validDurations[0]
  if (validDurations.indexOf(duration) === -1) {
    retval = duration
  }
  return retval
}
