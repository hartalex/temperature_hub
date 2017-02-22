var assert = require('assert')
var mockMongoDb = require('../db/mock-mongodb')
const data = require('../../api/data/data')

data.db = mockMongoDb

describe('data', function () {
  describe('#dataAdd(input)', function () {
    it('dataAdd temperature success', function () {
      var input = {
        id: 'test',
        t: 50 }
      data.dataAdd(input).then(function (output) {
        console.log(output)
        assert.equal(output.result, 'ok')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail missing id property', function () {
      var input = {
        t: 50 }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property id/sensorId is missing')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail missing t property', function () {
      var input = {
        id: 'test'
      }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Missing t property')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail id property not a string', function () {
      var input = {
        id: 6,
        t: 50 }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property id is not a string')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail id property is an empty string', function () {
      var input = {
        id: '',
        t: 50 }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property id is an empty string')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail t property not a number', function () {
      var input = {
        id: 'test',
        t: 'test' }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property t is not a number')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd door success', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail missing sensorId property', function () {
      var input = {
        isOpen: false }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property id/sensorId is missing')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail missing isOpen property', function () {
      var input = {
        sensorId: 'test' }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property isOpen is missing')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail sensorId property not a string', function () {
      var input = {
        sensorId: 2,
        isOpen: false }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property sensorId is not a string')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail sensorId is empty string', function () {
      var input = {
        sensorId: '',
        isOpen: false }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property sensorId is an empty string')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail isOpen isnot a boolean', function () {
      var input = {
        sensorId: 'test',
        isOpen: 7 }
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Property isOpen is not a boolean')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail input is undefined', function () {
      var input
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Input is undefined')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })

    it('dataAdd fail input is undefined', function () {
      var input = null
      data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'fail')
        assert.equal(output.reason, 'Input is null')
      }).catch(function (err) {
        assert.notEqual(err, null)
      })
    })
  })
})
