var assert = require("assert");
var db = require("./mongodb");
var mockDB = require("./mock-db");
var mockMongoClient = require("./mock-mongo-client");

function expectFailure(promise, failure) {
  return promise
    .then(function(dbobj) {
      /* istanbul ignore next */
      assert.fail("failure was not caught");
    })
    .catch(function(err) {
      assert.equal(err, failure);
    });
}

describe("mongodb", function() {
  describe("#connect()", function() {
    it("should return err because url is null", function() {
      var url = null;
      return expectFailure(db().connect(url), "url cannot be null");
    });

    it("should return err because url is not a string", function() {
      var url = 0;
      return expectFailure(db().connect(url), "url must be a string");
    });

    it("should pass ok", function() {
      var url = "string";
      var dbobj = db(mockMongoClient.connect());
      return dbobj.connect(url).then(function(dbobj) {
        assert.deepEqual(dbobj, {});
      });
    });

    it("should fail with error", function() {
      var url = "string";
      var dbobj = db(mockMongoClient.connectFail());
      return expectFailure(dbobj.connect(url), "error");
    });
  });

  doATest("#queryData()", {
    func: db().queryData,
    mockdbGood: mockDB.queryData,
    mockdbBad: mockDB.queryDataFail
  });

  doATest(
    "#querydistinctData()",
    {
      func: db().querydistinctData,
      mockdbGood: mockDB.querydistinctData,
      mockdbBad: mockDB.querydistinctDataFail
    },
    [{}]
  );

  function testQuery(funcs, retobj) {
    if (typeof retobj === "undefined") {
      retobj = {};
    }
    it("db object is null should return error", function() {
      funcs.func.call(db(), null, null, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });
    it("query object is null should return error", function() {
      funcs.func.call(db(), {}, null, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });
    testObjectIsNull(funcs.func);
    it("db mocked to no error should return empty obj", function() {
      funcs.func.call(db(), funcs.mockdbGood.call(mockDB), {}, {}, function(
        error,
        result
      ) {
        assert.deepEqual(result, retobj);
      });
    });
    it("db mocked to error should return error", function() {
      funcs.func.call(db(), funcs.mockdbBad.call(mockDB), {}, {}, function(
        error,
        result
      ) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });
  }

  doATest("#queryOneData()", {
    func: db().queryOneData,
    mockdbGood: mockDB.queryOneData,
    mockdbBad: mockDB.queryOneDataFail
  });

  describe("#queryLastData()", function() {
    it("db object is null should return error", function() {
      db().queryLastData(null, null, null, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });

    it("query object is null should return error", function() {
      db().queryLastData({}, null, null, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });

    it("sort object is null should return error", function() {
      db().queryLastData({}, {}, null, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });

    it("collection object is null should return error", function() {
      db().queryLastData({}, {}, {}, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });

    it("db mocked to no error should return empty obj", function() {
      db().queryLastData(mockDB.queryLastData(), {}, {}, {}, function(
        error,
        result
      ) {
        assert.deepEqual(result, {});
      });
    });
    it("db mocked to error should return error", function() {
      db().queryLastData(mockDB.queryLastDataFail(), {}, {}, {}, function(
        error,
        result
      ) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });
  });

  describe("#queryAggregateData()", function() {
    testQuery({
      func: db().queryAggregateData,
      mockdbGood: mockDB.queryAggregateData,
      mockdbBad: mockDB.queryAggregateDataFail
    });
  });

  describe("#insertData()", function() {
    it("db object is null should return null", function() {
      db()
        .insertData(null, null, null)
        .then(function(result) {
          /* istanbul ignore next */
          assert.fail("failure was not caught");
        })
        .catch(function(err) {
          assert.equal(err, "parameter db is null");
        });
    });

    it("collection object is null should return empty array", function() {
      db()
        .insertData({}, null, null)
        .then(function(result) {
          /* istanbul ignore next */
          assert.fail("failure was not caught");
        })
        .catch(function(err) {
          assert.equal(err, "parameter collection is null");
        });
    });

    it("obj object is null should return empty array", function() {
      db()
        .insertData({}, {}, null)
        .then(function(result) {
          /* istanbul ignore next */
          assert.fail("failure was not caught");
        })
        .catch(function(err) {
          assert.equal(err, "parameter obj is null");
        });
    });
    it("db mocked to no error should return empty obj", function() {
      db()
        .insertData(mockDB.insert(), {}, {})
        .then(function(result) {
          assert.deepEqual(result, {});
        });
    });
    it("db mocked to error should return the error message", function() {
      db()
        .insertData(mockDB.insertFail(), {}, {})
        .then(function(result) {
          /* istanbul ignore next */
          assert.fail("failure was not caught");
        })
        .catch(function(err) {
          assert.equal(err, "error");
        });
    });
  });

  describe("#deleteData()", function() {
    it("db object is null should return empty array", function() {
      db().deleteData(null, null, null, function(error, result) {
        assert.deepEqual(result, null);
      });
    });

    it("collection object is null should return empty array", function() {
      db().deleteData({}, null, null, function(error, result) {
        assert.deepEqual(result, null);
      });
    });

    testObjectIsNull(db().deleteData);

    it("db mocked to no error should return empty obj", function() {
      db().deleteData(mockDB.remove(), {}, {}, function(error, result) {
        assert.equal(error, null);
        assert.deepEqual(result, {});
      });
    });
    it("db mocked to error should return null", function() {
      db().deleteData(mockDB.removeFail(), {}, {}, function(error, result) {
        assert.deepEqual(result, null);
      });
    });
  });
  function testObjectIsNull(func) {
    it("collection object is null should return null", function() {
      func.call(db(), {}, {}, null, function(error, result) {
        assert.notEqual(error, null);
        assert.equal(typeof result, "undefined");
      });
    });
  }
  function doATest(testName, funcs, retobj) {
    describe(testName, function() {
      testQuery(funcs, retobj);
    });
  }
});
