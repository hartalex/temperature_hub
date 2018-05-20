const durational_req_res = require('../durational_req_res')
const doAggregateQuery = require('../aggregateQuery')

function getAggregateQuery(lastOldestTime, timeStampCompareLength) {
  return [{ '$match': {
        tempInFarenheit: { '$lt': 185 },
        utc_timestamp: { '$gt': lastOldestTime }
      }
    },
    { '$group': {
        '_id': {
          'minute': { '$substr': ['$utc_timestamp', 0, timeStampCompareLength] },
          'sensorId': '$sensorId'
        },
        'tempInFarenheit': { $avg: '$tempInFarenheit' }
      }
    },
    { '$group': {
        '_id': { 'minute': '$_id.minute' },
        'results': {
          $push: {
            'sensorId': '$_id.sensorId',
            'tempInFarenheit': '$tempInFarenheit' }
        }
      }
    },
    { '$sort': { '_id.minute': 1 } }
  ]
}

var findTemperaturesLastXMonths = function(dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * 30 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'temperatures')
}

var findTemperaturesLastXDays = function(dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'temperatures')
}

var findTemperaturesLastXHours = function(dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * x * 1000)).toISOString()
doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'temperatures')
}

module.exports = durational_req_res.durational_req_res(findTemperaturesLastXHours, findTemperaturesLastXDays, findTemperaturesLastXMonths)
