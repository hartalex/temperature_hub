const durational_req_res = require('../durational_req_res')
const doAggregateQuery = require('../aggregateQuery')
function getAggregateQuery (lastOldestTime, timeStampCompareLength) {
  return [{
    '$match': { utc_timestamp: { '$gt': lastOldestTime } }
  },
  {
    '$group': {
      '_id': {
         'minute': { '$substr': ['$utc_timestamp', 0, timeStampCompareLength] }
      },
      'results': {
        $push: {
          'sensorId': '$sensorId',
          'isOpen': '$isOpen'
        }
      }
    }
  },
  { '$sort': { '_id.minute': 1 } }
  ]
}

var finddoorsLastXMonths = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * 30 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'doors')
}

var finddoorsLastXDays = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * 24 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'doors')
}

var finddoorsLastXHours = function (dbobj, x, callback) {
  const lastOldestTime = new Date(new Date() - (3600 * x * 1000)).toISOString()
  doAggregateQuery(dbobj, x, callback, lastOldestTime, getAggregateQuery, 'doors')
}

module.exports = durational_req_res.durational_req_res(finddoorsLastXHours, finddoorsLastXDays, finddoorsLastXMonths)
