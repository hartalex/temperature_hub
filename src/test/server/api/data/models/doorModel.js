var assert = require('assert')
const doorModel = require('../../../../../server/api/data/models/doorModel')

describe('temperature model', function() {

    it('model success', function() {
      var input = {
        sensorId: 'test',
        isOpen: true,
        utc_timestamp: '20180101'
      }
      return doorModel(input).then(function (output) {
        assert.equal(output.sensorId, 'test')
          assert.equal(output.isOpen, true)
            assert.equal(output.utc_timestamp, '20180101')
      })
    })
  })
