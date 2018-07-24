var assert = require('assert')
const temperatureModel = require('../../../../../server/api/data/models/temperatureModel')

describe('temperature model', () => {

    it('model success temp', () => {
      var input = {
        id: 'test',
        t: 50,
        utc_timestamp: '20180101'
      }
      return temperatureModel(input).then((output) => {
        assert.equal(output.sensorId, 'test')
        assert.equal(output.tempInFarenheit, 50)
        assert.equal(output.humidity,undefined)
        assert.equal(output.utc_timestamp, '20180101')
      })
    })
    it('model success temp and humidity', () => {
      var input = {
        id: 'test',
        t: 50,
        h: 65,
        utc_timestamp: '20180101'
      }
      return temperatureModel(input).then((output) => {
        assert.equal(output.sensorId, 'test')
        assert.equal(output.tempInFarenheit, 50)
        assert.equal(output.humidity, 65)
        assert.equal(output.utc_timestamp, '20180101')
      })
    })
  })
