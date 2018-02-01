var assert = require('assert')
var db = require('../../server/api/db/mongodb')
var mockDB = require('./mock-db')
var mockMongoClient = require('./mock-mongo-client')

describe('mongodb', function () {
  describe('#connect()', function () {
    it('should return err because url is null', function () {
      var url = null
      var promise = db.connect(url)
      return promise.then(function (dbobj) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'url cannot be null')
      })
    })

    it('should return err because url is not a string', function () {
      var url = 0
      var promise = db.connect(url)
      return promise.then(function (dbobj) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'url must be a string')
      })
    })
    
    it('should pass ok', function () {
      var url = 'string'
      db.MongoClient = mockMongoClient.connect()
      return db.connect(url).then(function(dbobj) {
        assert.deepEqual(dbobj, {})
      })
    })
    
    it('should fail with error', function () {
      var url = 'string'
      db.MongoClient = mockMongoClient.connectFail()
      return db.connect(url).then(function(dbobj) {
          /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'error')
      })
    })
  })

  describe('#queryData()', function () {
    it('db object is null should return empty array', function () {
      db.queryData(null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('query object is null should return empty array', function () {
      db.queryData({}, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('collection object is null should return empty array', function () {
      db.queryData({}, {}, null, function (result) {
        assert.deepEqual(result, [])
      })
    })
    it('db mocked to no error should return not empty array', function () {
      db.queryData(mockDB.queryData(), {}, {}, function (result) {
        assert.deepEqual(result, [])
      })
    })
    it('db mocked to error should return empty array', function () {
      db.queryData(mockDB.queryDataFail(), {}, {}, function (result) {
        assert.deepEqual(result, [])
      })
    })
  })

  describe('#querydistinctData()', function () {
    it('db object is null should return empty array', function () {
      db.querydistinctData(null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('query object is null should return empty array', function () {
      db.querydistinctData({}, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('collection object is null should return empty array', function () {
      db.querydistinctData({}, {}, null, function (result) {
        assert.deepEqual(result, [])
      })
    })
    it('db mocked to no error should return not empty array', function () {
      db.querydistinctData(mockDB.querydistinctData(), {}, {}, function (result) {
        assert.deepEqual(result, [{}])
      })
    })
    it('db mocked to error should return empty array', function () {
      db.querydistinctData(mockDB.querydistinctDataFail(), {}, {}, function (result) {
        assert.deepEqual(result, [])
      })
    })
  })

  describe('#queryOneData()', function () {
    it('db object is null should return empty array', function () {
      db.queryOneData(null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('query object is null should return empty array', function () {
      db.queryOneData({}, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('collection object is null should return empty array', function () {
      db.queryOneData({}, {}, null, function (result) {
        assert.deepEqual(result, [])
      })
    })
    it('db mocked to no error should return empty obj', function () {
      db.queryOneData(mockDB.queryOneData(), {}, {}, function (result) {
        assert.deepEqual(result, {})
      })
    })
    it('db mocked to error should return null', function () {
      db.queryOneData(mockDB.queryOneDataFail(), {}, {}, function (result) {
        assert.deepEqual(result, null)
      })
    })
  })

  describe('#queryLastData()', function () {
    it('db object is null should return empty array', function () {
      db.queryLastData(null, null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('query object is null should return empty array', function () {
      db.queryLastData({}, null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('sort object is null should return empty array', function () {
      db.queryLastData({}, {}, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('collection object is null should return empty array', function () {
      db.queryLastData({}, {}, {}, null, function (result) {
        assert.deepEqual(result, [])
      })
    })
    
    it('db mocked to no error should return empty obj', function () {
      db.queryLastData(mockDB.queryLastData(), {}, {}, {}, function (result) {
        assert.deepEqual(result, {})
      })
    })
    it('db mocked to error should return null', function () {
      db.queryLastData(mockDB.queryLastDataFail(), {}, {}, {}, function (result) {
        assert.deepEqual(result, null)
      })
    })
    it('db mocked to error should return null', function () {
      db.queryLastData(mockDB.queryLastDataFail2(), {}, {}, {}, function (result) {
        assert.deepEqual(result, null)
      })
    })
  })

  describe('#queryAggregateData()', function () {
    it('db object is null should return empty array', function () {
      db.queryAggregateData(null, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('query object is null should return empty array', function () {
      db.queryAggregateData({}, null, null, function (result) {
        assert.deepEqual(result, [])
      })
    })

    it('collection object is null should return empty array', function () {
      db.queryAggregateData({}, {}, null, function (result) {
        assert.deepEqual(result, [])
      })
    })
    it('db mocked to no error should return empty obj', function () {
      db.queryAggregateData(mockDB.queryAggregateData(), {}, {}, function (result) {
        assert.deepEqual(result, {})
      })
    })
    it('db mocked to error should return empty array', function () {
      db.queryAggregateData(mockDB.queryAggregateDataFail(), {}, {}, function (result) {
        assert.deepEqual(result, [])
      })
    })
  })

  describe('#insertData()', function () {
    it('db object is null should return null', function () {
      db.insertData(null, null, null).then(function (result) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'parameter db is null')
      })
    })

    it('collection object is null should return empty array', function () {
      db.insertData({}, null, null).then(function (result) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'parameter collection is null')
      })
    })

    it('obj object is null should return empty array', function () {
      db.insertData({}, {}, null).then(function (result) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'parameter obj is null')
      })
    })
    it('db mocked to no error should return empty obj', function () {
      db.insertData(mockDB.insert(), {}, {}).then(function (result) {
        assert.deepEqual(result, {})
      })
    })
    it('db mocked to error should return the error message', function () {
      db.insertData(mockDB.insertFail(), {}, {}).then(function (result) {
        /* istanbul ignore next */
        assert.fail('failure was not caught')
      }).catch(function (err) {
        assert.equal(err, 'error')
      })
    })
  })

  describe('#deleteData()', function () {
    it('db object is null should return empty array', function () {
      db.deleteData(null, null, null, function (result) {
        assert.deepEqual(result, null)
      })
    })

    it('collection object is null should return empty array', function () {
      db.deleteData({}, null, null, function (result) {
        assert.deepEqual(result, null)
      })
    })

    it('obj object is null should return empty array', function () {
      db.deleteData({}, {}, null, function (result) {
        assert.deepEqual(result, null)
      })
    })
    it('db mocked to no error should return empty obj', function () {
      db.deleteData(mockDB.remove(), {}, {}, function (result) {
        assert.deepEqual(result, {})
      })
    })
    it('db mocked to error should return null', function () {
      db.deleteData(mockDB.removeFail(), {}, {}, function (result) {
        assert.deepEqual(result, null)
      })
    })
  })
})
