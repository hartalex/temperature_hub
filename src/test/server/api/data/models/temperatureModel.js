var assert = require('assert')
const temperatureModel = require('../../../../../server/api/data/models/temperatureModel')

describe('temperature model', function() {

    it('model success', function() {
      var input = {
        id: 'test',
        t: 50,
        utc_timestamp: '20180101'
      }
      return temperatureModel(input).then(function (output) {
        assert.equal(output.sensorId, 'test')
          assert.equal(output.tempInFarenheit, 50)
            assert.equal(output.utc_timestamp, '20180101')
      })
    })
  })
