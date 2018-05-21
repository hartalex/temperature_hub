const durational_req_res = require('../durational_req_res')

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

module.exports = durational_req_res.durational_req_res(getAggregateQuery, 'temperatures')
