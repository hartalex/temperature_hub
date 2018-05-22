import mockMongoDbDoorSensorName from '../db/mock-mongodb-door-sensor-name'
var assert = require('assert')
var mockMongoDb = require('../db/mock-mongodb')
var mockMongoDbDupeFound = require('../db/mock-mongodb-dupefound')
var mockMongoDbDupeNotFound = require('../db/mock-mongodb-dupenotfound')
var mockMongoDbDoorClosed = require('../db/mock-mongodb-doorclosed')
var mockMongoDbTemp = require('../db/mock-mongodb-temp')
var mockMongoDbThrowInsertError = require('../db/mock-mongodb-throw-error')
const data = require('../../../../server/api/data/data')
const mockSlack = require('./mockSlack')(null)
var mockDB = require('../db/mock-db')

describe('data', function() {
  describe('#tempAdd(input)', function() {
    it('tempAdd temperature success', function() {
      var input = {
        id: 'test',
        t: 50
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })

    it('tempAdd fail missing t property', function() {
      var input = {
        id: 'test'
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Property t is missing')
      })
    })

    it('tempAdd fail id property not a string', function() {
      var input = {
        id: 6,
        t: 50
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is not a string')
      })
    })

    it('tempAdd fail id property is an empty string', function() {
      var input = {
        id: '',
        t: 50
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is an empty string')
      })
    })

    it('tempAdd fail t property not a number', function() {
      var input = {
        id: 'test',
        t: 'test'
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 't is not a number')
      })
    })
    it('tempAdd fail input is undefined', function() {
      var input
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('tempAdd fail input is null', function() {
      var input = null
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('tempAdd temp fail duplicate', function() {
      var input = {
        id: 'test',
        t: 0
      }

      var  dataobj = data(mockMongoDbTemp, mockDB.all(), {NoDuplicateData:true})
      return dataobj.tempAdd(input).then(function(output) {
        assert.failure('should have errored')
      }).catch(function(error) {
        assert.equal(error, 'duplicate')
      })
    })

    it('tempAdd temp success duplicate config', function() {
      var input = {
        id: 'test',
        t: 0
      }

      var dataobj = data(mockMongoDb, mockDB.all(), {NoDuplicateData:true})
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })

    it('tempAdd temp success utc_timestamp', function() {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0
      }

      var dataobj = data(mockMongoDb, mockDB.all(), {NoDuplicateData:true})
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })
    })

  describe('#doorAdd(input)', function() {
    it('doorAdd door success', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      var dataobj = data(mockMongoDb, mockDB.all(), undefined, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })

    it('doorAdd fail missing isOpen property', function() {
      var input = {
        sensorId: 'test'
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Property isOpen is missing')
      })
    })

    it('doorAdd fail sensorId property not a string', function() {
      var input = {
        sensorId: 2,
        isOpen: false
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is not a string')
      })
    })

    it('doorAdd fail sensorId is empty string', function() {
      var input = {
        sensorId: '',
        isOpen: false
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is an empty string')
      })
    })

    it('doorAdd fail isOpen isnot a boolean', function() {
      var input = {
        sensorId: 'test',
        isOpen: 7
      }
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'isOpen is not a boolean')
      })
    })

    it('doorAdd fail input is undefined', function() {
      var input
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('doorAdd fail input is null', function() {
      var input = null
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('doorAdd door fail duplicate', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }

      var dataobj = data(mockMongoDbDoorClosed, mockDB.all(), {NoDuplicateData:true})
      return dataobj.doorAdd(input).then(function(output) {
        assert.failure('should have errored')
      }).catch(function(error) {
        assert.equal(error, 'duplicate')
      })
    })

    it('doorAdd door fail duplicate', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }

      var dataobj = data(mockMongoDbDoorClosed, mockDB.all(), {NoDuplicateData:true})
      return dataobj.doorAdd(input).then(function(output) {
        assert.failure('should have errored')
      }).catch(function(error) {
        assert.equal(error, 'duplicate')
      })
    })

    it('doorAdd door success duplicate config', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }
      var dataobj = data(mockMongoDb, mockDB.all(), {NoDuplicateData:true}, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })

    it('doorAdd door success duplicate slack dupe found', function() {
      var input = {
        sensorId: 'test',
        isOpen: true
      }
      var dataobj = data(mockMongoDbDupeFound, mockDB.all(), {NoDuplicateData:false}, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
        assert.equal(mockSlack.SlackPost.callCount, 2)
      })
    })

    it('doorAdd door success duplicate slack dupe not found', function() {
      var input = {
        sensorId: 'test',
        isOpen: true
      }
      var dataobj = data(mockMongoDbDupeNotFound, mockDB.all(), {NoDuplicateData:false}, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
        assert.equal(mockSlack.SlackPost.callCount, 3)
      })
    })

    it('doorAdd door success utc_timestamp', function() {
      var input = {
        sensorId: 'test',
        utc_timestamp: 'timestamp',
        isOpen: false
      }

      var dataobj = data(mockMongoDb, mockDB.all(), {NoDuplicateData:true}, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })

    it('doorAdd door success db sensor name', function() {
      var input = {
        sensorId: 'test',
        utc_timestamp: 'timestamp',
        isOpen: false
      }

      var dataobj = data(mockMongoDbDoorSensorName, mockDB.all(), {NoDuplicateData:true}, mockSlack)
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input)
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
      var dataobj = data(mockMongoDb, mockDB.all())
      return dataobj.menuAdd(input).then(function(output) {
        assert.deepEqual(output, input)
      })
    })
    it('menuAdd menuItem fail duplicate', function() {
      var input = {
        date: 'test',
        firstOption: ' ',
        secondOption: ' ',
        otherStuff: ' '
      }
      var dataobj = data(mockMongoDbTemp, mockDB.all())
      return dataobj.menuAdd(input).then(function(output) {
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
      var dataobj = data(mockMongoDbThrowInsertError, mockDB.all())
      return dataobj.menuAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'db error')
      })
    })


  it('dupeProp isOpen', function() {
    var existingData = {isOpen:true}
    var dupeObject = {isOpen:false}
    var dupeProp = 'isOpen'
     assert.notEqual(existingData[dupeProp], dupeObject[dupeProp])
   })
   it('dupeProp tempInFarenheit', function() {
     var existingData = {tempInFarenheit:60}
     var dupeObject = {tempInFarenheit:61}
     var dupeProp = 'tempInFarenheit'
      assert.notEqual(existingData[dupeProp], dupeObject[dupeProp])
    })
  })
})
