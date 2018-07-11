const durational_req_res = require('../durational_req_res')

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

module.exports = durational_req_res.durational_req_res(getAggregateQuery, 'doors').bind(durational_req_res)
