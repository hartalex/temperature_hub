var assert = require('assert')
var mockMongoDb = require('../db/mock-mongodb')
var mockMongoDbDoorClosed = require('../db/mock-mongodb-doorclosed')
var mockMongoDbTemp = require('../db/mock-mongodb-temp')
var mockMongoDbThrowInsertError = require('../db/mock-mongodb-throw-error')
var mockMongoDbBadReturn = require('../db/mock-mongodb-bad-return')
const data = require('../../server/api/data/data')

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
        assert.equal(err, 'Property t is missing')
      })
    })

    it('dataAdd fail id property not a string', function () {
      var input = {
        id: 6,
        t: 50 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'id is not a string')
      })
    })

    it('dataAdd fail id property is an empty string', function () {
      var input = {
        id: '',
        t: 50 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'id is an empty string')
      })
    })

    it('dataAdd fail t property not a number', function () {
      var input = {
        id: 'test',
        t: 'test' }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 't is not a number')
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
        assert.equal(err, 'sensorId is not a string')
      })
    })

    it('dataAdd fail sensorId is empty string', function () {
      var input = {
        sensorId: '',
        isOpen: false }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'sensorId is an empty string')
      })
    })

    it('dataAdd fail isOpen isnot a boolean', function () {
      var input = {
        sensorId: 'test',
        isOpen: 7 }
      return data.dataAdd(input).catch(function (err) {
        assert.equal(err, 'isOpen is not a boolean')
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
  describe('#menuAdd(input)', function () {
    it('menuAdd success', function () {
      var input = {
        date: '2017',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '}
      return data.menuAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd door fail duplicate', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbDoorClosed
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd door fail duplicate', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbDoorClosed
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
        assert.equal(output.reason, 'duplicate')
      })
    })

    it('dataAdd door success duplicate config', function () {
      var input = {
        sensorId: 'test',
        isOpen: false }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd door success utc_timestamp', function () {
      var input = {
        sensorId: 'test',
        utc_timestamp: 'timestamp',
        isOpen: false }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd temp fail duplicate', function () {
      var input = {
        id: 'test',
        t: 0 }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbTemp
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
        assert.equal(output.reason, 'duplicate')
      })
    })

    it('dataAdd temp success duplicate config', function () {
      var input = {
        id: 'test',
        t: 0 }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('dataAdd temp success utc_timestamp', function () {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0 }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.dataAdd(input).then(function (output) {
        assert.equal(output.result, 'ok')
      })
    })
    it('dataAdd temp success bad db return data', function () {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0 }
      data.db = mockMongoDbBadReturn
      return data.dataAdd(input).then(function (output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function (err) {
        assert.equal(err, 'error end of promise')
      })
    })

    it('menuAdd menuItem fail duplicate', function () {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' ' }
      data.db = mockMongoDbTemp
      return data.menuAdd(input).then(function (output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function (err) {
        assert.equal(err, 'menuItem already exists')
      })
    })

    it('menuAdd menuItem fail db error', function () {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' ' }
      data.db = mockMongoDbThrowInsertError
      return data.menuAdd(input).then(function (output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function (err) {
        assert.equal(err, 'db error')
      })
    })
    it('menuAdd menuItem success bad db return data', function () {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' ' }
      data.db = mockMongoDbBadReturn
      return data.menuAdd(input).then(function (output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function (err) {
        assert.equal(err, 'error end of promise')
      })
    })
  })
})
