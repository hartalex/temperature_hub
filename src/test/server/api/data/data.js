var assert = require('assert')
var mockMongoDb = require('../db/mock-mongodb')
var mockMongoDbDoorClosed = require('../db/mock-mongodb-doorclosed')
var mockMongoDbTemp = require('../db/mock-mongodb-temp')
var mockMongoDbThrowInsertError = require('../db/mock-mongodb-throw-error')
var mockMongoDbBadReturn = require('../db/mock-mongodb-bad-return')
const data = require('../../../../server/api/data/data')

describe('data', function() {
  describe('#tempAdd(input)', function() {
    it('tempAdd temperature success', function() {
      var input = {
        id: 'test',
        t: 50
      }
      data.db = mockMongoDb
      return data.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('tempAdd fail missing t property', function() {
      var input = {
        id: 'test'
      }
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Property t is missing')
      })
    })

    it('tempAdd fail id property not a string', function() {
      var input = {
        id: 6,
        t: 50
      }
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is not a string')
      })
    })

    it('tempAdd fail id property is an empty string', function() {
      var input = {
        id: '',
        t: 50
      }
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is an empty string')
      })
    })

    it('tempAdd fail t property not a number', function() {
      var input = {
        id: 'test',
        t: 'test'
      }
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 't is not a number')
      })
    })
    it('tempAdd fail input is undefined', function() {
      var input
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('tempAdd fail input is null', function() {
      var input = null
      data.db = mockMongoDb
      return data.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('tempAdd temp fail duplicate', function() {
      var input = {
        id: 'test',
        t: 0
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbTemp
      return data.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
        assert.equal(output.reason, 'duplicate')
      })
    })

    it('tempAdd temp success duplicate config', function() {
      var input = {
        id: 'test',
        t: 0
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('tempAdd temp success utc_timestamp', function() {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })
    it('tempAdd temp success bad db return data', function() {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0
      }
      data.db = mockMongoDbBadReturn
      return data.tempAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'error end of promise')
      })
    })
  })

  describe('#doorAdd(input)', function() {
    it('doorAdd door success', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      data.db = mockMongoDb
      return data.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('doorAdd fail missing isOpen property', function() {
      var input = {
        sensorId: 'test'
      }
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Property isOpen is missing')
      })
    })

    it('doorAdd fail sensorId property not a string', function() {
      var input = {
        sensorId: 2,
        isOpen: false
      }
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is not a string')
      })
    })

    it('doorAdd fail sensorId is empty string', function() {
      var input = {
        sensorId: '',
        isOpen: false
      }
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is an empty string')
      })
    })

    it('doorAdd fail isOpen isnot a boolean', function() {
      var input = {
        sensorId: 'test',
        isOpen: 7
      }
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'isOpen is not a boolean')
      })
    })

    it('doorAdd fail input is undefined', function() {
      var input
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('doorAdd fail input is null', function() {
      var input = null
      data.db = mockMongoDb
      return data.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('doorAdd door fail duplicate', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbDoorClosed
      return data.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('doorAdd door fail duplicate', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDbDoorClosed
      return data.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
        assert.equal(output.reason, 'duplicate')
      })
    })

    it('doorAdd door success duplicate config', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('doorAdd door success utc_timestamp', function() {
      var input = {
        sensorId: 'test',
        utc_timestamp: 'timestamp',
        isOpen: false
      }
      data.config.NoDuplicateData = true
      data.db = mockMongoDb
      return data.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })
  })
  describe('#menuAdd(input)', function() {
    it('menuAdd success', function() {
      var input = {
        date: '2017',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '
      }
      data.db = mockMongoDb
      return data.menuAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })
    it('menuAdd menuItem fail duplicate', function() {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '
      }
      data.db = mockMongoDbTemp
      return data.menuAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'menuItem already exists')
      })
    })

    it('menuAdd menuItem fail db error', function() {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '
      }
      data.db = mockMongoDbThrowInsertError
      return data.menuAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'db error')
      })
    })
    it('menuAdd menuItem success bad db return data', function() {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '
      }
      data.db = mockMongoDbBadReturn
      return data.menuAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'error end of promise')
      })
    })
  })
})
