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
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd fail missing id property', function () {
      var input = {
        t: 50 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property id/sensorId is missing')
      })
    })

    it('dataAdd fail missing t property', function () {
      var input = {
        id: 'test'
      }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Missing t property')
      })
    })

    it('dataAdd fail id property not a string', function () {
      var input = {
        id: 6,
        t: 50 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property id is not a string')
      })
    })

    it('dataAdd fail id property is an empty string', function () {
      var input = {
        id: '',
        t: 50 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property id is an empty string')
      })
    })

    it('dataAdd fail t property not a number', function () {
      var input = {
        id: 'test',
        t: 'test' }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property t is not a number')
      })
    })

    it('dataAdd door success', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd fail missing sensorId property', function () {
      var input = {
        isOpen: false }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property id/sensorId is missing')
      })
    })

    it('dataAdd fail missing isOpen property', function () {
      var input = {
        sensorId: 'test' }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property isOpen is missing')
      })
    })

    it('dataAdd fail sensorId property not a string', function () {
      var input = {
        sensorId: 2,
        isOpen: false }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property sensorId is not a string')
      })
    })

    it('dataAdd fail sensorId is empty string', function () {
      var input = {
        sensorId: '',
        isOpen: false }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property sensorId is an empty string')
      })
    })

    it('dataAdd fail isOpen isnot a boolean', function () {
      var input = {
        sensorId: 'test',
        isOpen: 7 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Property isOpen is not a boolean')
      })
    })

    it('dataAdd fail input is undefined', function () {
      var input
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('dataAdd fail input is undefined', function () {
      var input = null
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'Input is null')
      })
    })
  })
})
