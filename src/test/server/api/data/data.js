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
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('tempAdd fail missing t property', function() {
      var input = {
        id: 'test'
      }
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Property t is missing')
      })
    })

    it('tempAdd fail id property not a string', function() {
      var input = {
        id: 6,
        t: 50
      }
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is not a string')
      })
    })

    it('tempAdd fail id property is an empty string', function() {
      var input = {
        id: '',
        t: 50
      }
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'id is an empty string')
      })
    })

    it('tempAdd fail t property not a number', function() {
      var input = {
        id: 'test',
        t: 'test'
      }
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 't is not a number')
      })
    })
    it('tempAdd fail input is undefined', function() {
      var input
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('tempAdd fail input is null', function() {
      var input = null
      var dataobj = data(mockMongoDb)
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('tempAdd temp fail duplicate', function() {
      var input = {
        id: 'test',
        t: 0
      }

      var  dataobj = data(mockMongoDbTemp, {NoDuplicateData:true})
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

      var dataobj = data(mockMongoDb, {NoDuplicateData:true})
      return dataobj.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('tempAdd temp success utc_timestamp', function() {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0
      }

      var dataobj = data(mockMongoDb, {NoDuplicateData:true})
      return dataobj.tempAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })
    it('tempAdd temp success bad db return data', function() {
      var input = {
        id: 'test',
        utc_timestamp: 'timestamp',
        t: 0
      }
      var dataobj = data(mockMongoDbBadReturn)
      return dataobj.tempAdd(input).then(function(output) {
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
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('doorAdd fail missing isOpen property', function() {
      var input = {
        sensorId: 'test'
      }
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Property isOpen is missing')
      })
    })

    it('doorAdd fail sensorId property not a string', function() {
      var input = {
        sensorId: 2,
        isOpen: false
      }
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is not a string')
      })
    })

    it('doorAdd fail sensorId is empty string', function() {
      var input = {
        sensorId: '',
        isOpen: false
      }
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'sensorId is an empty string')
      })
    })

    it('doorAdd fail isOpen isnot a boolean', function() {
      var input = {
        sensorId: 'test',
        isOpen: 7
      }
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'isOpen is not a boolean')
      })
    })

    it('doorAdd fail input is undefined', function() {
      var input
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is undefined')
      })
    })

    it('doorAdd fail input is null', function() {
      var input = null
      var dataobj = data(mockMongoDb)
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, 'Input is null')
      })
    })

    it('doorAdd door fail duplicate', function() {
      var input = {
        sensorId: 'test',
        isOpen: false
      }

      var dataobj = data(mockMongoDbDoorClosed, {NoDuplicateData:true})
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

      var dataobj = data(mockMongoDbDoorClosed, {NoDuplicateData:true})
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

      var dataobj = data(mockMongoDb, {NoDuplicateData:true})
      return dataobj.doorAdd(input).then(function(output) {
        assert.equal(output.result, 'ok')
      })
    })

    it('doorAdd door success utc_timestamp', function() {
      var input = {
        sensorId: 'test',
        utc_timestamp: 'timestamp',
        isOpen: false
      }

      var dataobj = data(mockMongoDb, {NoDuplicateData:true})
      return dataobj.doorAdd(input).then(function(output) {
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
      var dataobj = data(mockMongoDb)
      return dataobj.menuAdd(input).then(function(output) {
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
      var dataobj = data(mockMongoDbTemp)
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
      var dataobj = data(mockMongoDbThrowInsertError)
      return dataobj.menuAdd(input).then(function(output) {
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
      var dataobj = data(mockMongoDbBadReturn)
      return dataobj.menuAdd(input).then(function(output) {
        /* istanbul ignore next */
        assert.failure('should have errored')
      }).catch(function(err) {
        assert.equal(err, 'error end of promise')
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
