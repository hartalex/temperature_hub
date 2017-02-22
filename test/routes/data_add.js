var assert = require('assert')
var mockMongoDb = require('../db/mock-mongodb')
const data = require('../../api/data/data')

data.db = mockMongoDb

describe('data', function () {
  describe('#dataAdd(input, output)', function () {
    it('dataAdd temperature success', function () {
      var input = {
        id: 'test',
        t: 50 }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'ok')
    })

    it('dataAdd fail missing id property', function () {
      var input = {
        t: 50 }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property id/sensorId is missing')
    })

    it('dataAdd fail missing t property', function () {
      var input = {
        id: 'test'
      }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Missing t property')
    })

    it('dataAdd fail id property not a string', function () {
      var input = {
        id: 6,
        t: 50 }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property id is not a string')
    })

    it('dataAdd fail id property is an empty string', function () {
      var input = {
        id: '',
        t: 50 }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property id is an empty string')
    })

    it('dataAdd fail t property not a number', function () {
      var input = {
        id: 'test',
        t: 'test' }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property t is not a number')
    })

    it('dataAdd door success', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'ok')
    })

    it('dataAdd fail missing sensorId property', function () {
      var input = {
        isOpen: false }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property id/sensorId is missing')
    })

    it('dataAdd fail missing isOpen property', function () {
      var input = {
        sensorId: 'test' }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property isOpen is missing')
    })

    it('dataAdd fail sensorId property not a string', function () {
      var input = {
        sensorId: 2,
        isOpen: false }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property sensorId is not a string')
    })

    it('dataAdd fail sensorId is empty string', function () {
      var input = {
        sensorId: '',
        isOpen: false }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property sensorId is an empty string')
    })

    it('dataAdd fail isOpen isnot a boolean', function () {
      var input = {
        sensorId: 'test',
        isOpen: 7 }
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Property isOpen is not a boolean')
    })

    it('dataAdd fail input is undefined', function () {
      var input
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Input is undefined')
    })

    it('dataAdd fail input is undefined', function () {
      var input = null
      var output = {}
      data.dataAdd(input, output)
      assert.equal(output.result, 'fail')
      assert.equal(output.reason, 'Input is null')
    })
  })
})
