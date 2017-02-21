var assert = require('assert')
var db = require('../../api/db/mongodb')

describe('mongodb', function () {
  describe('#connect()', function () {
    it('should return err because url is null', function () {
      var url = null
      db.connect(url, function (err, dbobj) {
        assert.notEqual(err, null)
      })
    })

    it('should return err because url is not a string', function () {
      var url = 0
      db.connect(url, function (err, dbobj) {
        assert.notEqual(err, null)
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
  })

  describe('#insertData()', function () {
    it('db object is null should return empty array', function () {
      db.insertData(null, null, null, function (result) {
        assert.deepEqual(result, null)
      })
    })

    it('collection object is null should return empty array', function () {
      db.insertData({}, null, null, function (result) {
        assert.deepEqual(result, null)
      })
    })

    it('obj object is null should return empty array', function () {
      db.insertData({}, {}, null, function (result) {
        assert.deepEqual(result, null)
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
  })
})
