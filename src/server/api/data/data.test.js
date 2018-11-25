import mockMongoDbDoorSensorName from "../db/mock-mongodb-door-sensor-name";
import { init, checkDupesPromise } from "./data.js";
var assert = require("assert");
var mockMongoDb = require("../db/mock-mongodb");
var mockMongoDbDupeFound = require("../db/mock-mongodb-dupefound");
var mockMongoDbDupeNotFound = require("../db/mock-mongodb-dupenotfound");
var mockMongoDbDoorClosed = require("../db/mock-mongodb-doorclosed");
var mockMongoDbTemp = require("../db/mock-mongodb-temp");
var mockMongoDbThrowInsertError = require("../db/mock-mongodb-throw-error");
const mockSlack = require("./mockSlack")(null);
var mockDB = require("../db/mock-db");

describe("data", function() {
  describe("#tempAdd(input)", function() {
    it("tempAdd temperature success", function() {
      var input = {
        id: "test",
        t: 50
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });

    it("tempAdd fail missing t property", function() {
      var input = {
        id: "test"
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "Property t is missing");
      });
    });

    it("tempAdd fail id property not a string", function() {
      var input = {
        id: 6,
        t: 50
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "id is not a string");
      });
    });

    it("tempAdd fail id property is an empty string", function() {
      var input = {
        id: "",
        t: 50
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "id is an empty string");
      });
    });

    it("tempAdd fail t property not a number", function() {
      var input = {
        id: "test",
        t: "test"
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "t is not a number");
      });
    });
    it("tempAdd fail input is undefined", function() {
      var input;
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "Input is undefined");
      });
    });

    it("tempAdd fail input is null", function() {
      var input = null;
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.tempAdd(input).catch(function(err) {
        assert.equal(err, "Input is null");
      });
    });

    it("tempAdd temp fail duplicate", function() {
      var input = {
        id: "test",
        t: 0
      };
      var dataobj = init(mockMongoDbTemp, mockDB.all(), {
        NoDuplicateData: true
      });
      return dataobj
        .tempAdd(input)
        .then(function(output) {
          assert.failure("should have errored");
        })
        .catch(function(error) {
          assert.equal(error, "duplicate");
        });
    });

    it("tempAdd temp success duplicate config", function() {
      var input = {
        id: "test",
        t: 0
      };
      var dataobj = init(mockMongoDb, mockDB.all(), { NoDuplicateData: true });
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });

    it("tempAdd temp success utc_timestamp", function() {
      var input = {
        id: "test",
        utc_timestamp: "timestamp",
        t: 0
      };
      var dataobj = init(mockMongoDb, mockDB.all(), { NoDuplicateData: true });
      return dataobj.tempAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });
  });

  describe("#doorAdd(input)", function() {
    it("doorAdd door success", function() {
      var input = {
        sensorId: "test",
        isOpen: false
      };
      var dataobj = init(mockMongoDb, mockDB.all(), undefined, mockSlack);
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });

    function doorAddFail(input, error, mockmongo) {
      if (typeof mockmongo === "undefined") {
        mockmongo = mockMongoDb;
      }
      var dataobj = init(mockmongo, mockDB.all(), { NoDuplicateData: true });
      return dataobj.doorAdd(input).catch(function(err) {
        assert.equal(err, error);
      });
    }

    it("doorAdd fail missing isOpen property", function() {
      var input = {
        sensorId: "test"
      };
      return doorAddFail(input, "Property isOpen is missing");
    });

    it("doorAdd fail sensorId property not a string", function() {
      var input = {
        sensorId: 2,
        isOpen: false
      };
      return doorAddFail(input, "sensorId is not a string");
    });

    it("doorAdd fail sensorId is empty string", function() {
      var input = {
        sensorId: "",
        isOpen: false
      };
      return doorAddFail(input, "sensorId is an empty string");
    });

    it("doorAdd fail isOpen isnot a boolean", function() {
      var input = {
        sensorId: "test",
        isOpen: 7
      };
      return doorAddFail(input, "isOpen is not a boolean");
    });

    it("doorAdd fail input is undefined", function() {
      var input;
      return doorAddFail(input, "Input is undefined");
    });

    it("doorAdd fail input is null", function() {
      var input = null;
      return doorAddFail(input, "Input is null");
    });

    it("doorAdd door fail duplicate", function() {
      var input = {
        sensorId: "test",
        isOpen: false
      };
      return doorAddFail(input, "duplicate", mockMongoDbDoorClosed);
    });

    it("doorAdd door success duplicate config", function() {
      var input = {
        sensorId: "test",
        isOpen: false
      };
      var dataobj = init(
        mockMongoDb,
        mockDB.all(),
        { NoDuplicateData: true },
        mockSlack
      );
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });

    function testdoor_found_notfound(mockMongoDb, slackCallCount) {
      var input = {
        sensorId: "test",
        isOpen: true
      };
      var dataobj = init(
        mockMongoDb,
        mockDB.all(),
        { NoDuplicateData: false },
        mockSlack
      );
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input);
        assert.equal(mockSlack.SlackPost.callCount, slackCallCount);
      });
    }

    function testdoor_success(mockMongoDb) {
      var input = {
        sensorId: "test",
        utc_timestamp: "timestamp",
        isOpen: false
      };
      var dataobj = init(
        mockMongoDb,
        mockDB.all(),
        { NoDuplicateData: true },
        mockSlack
      );
      return dataobj.doorAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    }

    it("doorAdd door success duplicate slack dupe found", function() {
      return testdoor_found_notfound(mockMongoDbDupeFound, 2);
    });

    it("doorAdd door success duplicate slack dupe not found", function() {
      return testdoor_found_notfound(mockMongoDbDupeNotFound, 3);
    });

    it("doorAdd door success utc_timestamp", function() {
      return testdoor_success(mockMongoDb);
    });

    it("doorAdd door success db sensor name", function() {
      return testdoor_success(mockMongoDbDoorSensorName);
    });
  });
  describe("#menuAdd(input)", function() {
    it("menuAdd success", function() {
      var input = {
        date: "2017",
        firstOption: " ",
        secondOption: " ",
        otherStuff: " "
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj.menuAdd(input).then(function(output) {
        assert.deepEqual(output, input);
      });
    });

    function menuAddTestFail(mockMongoDb, error) {
      var input = {
        date: "test",
        firstOption: " ",
        secondOption: " ",
        otherStuff: " "
      };
      var dataobj = init(mockMongoDb, mockDB.all());
      return dataobj
        .menuAdd(input)
        .then(function(output) {
          /* istanbul ignore next */
          assert.failure("should have errored");
        })
        .catch(function(err) {
          assert.equal(err, error);
        });
    }

    it("menuAdd menuItem fail duplicate", function() {
      return menuAddTestFail(mockMongoDbTemp, null);
    });

    it("menuAdd menuItem fail db error", function() {
      return menuAddTestFail(mockMongoDbThrowInsertError, "db error");
    });

    it("dupeProp isOpen", function() {
      var existingData = { isOpen: true };
      var dupeObject = { isOpen: false };
      var dupeProp = "isOpen";
      assert.notEqual(existingData[dupeProp], dupeObject[dupeProp]);
    });
    it("dupeProp tempInFarenheit", function() {
      var existingData = { tempInFarenheit: 60 };
      var dupeObject = { tempInFarenheit: 61 };
      var dupeProp = "tempInFarenheit";
      assert.notEqual(existingData[dupeProp], dupeObject[dupeProp]);
    });
  });

  describe("#checkDupes(input)", async () => {
    it("checkDupes config turned off", async () => {
      const config = { NoDuplicateData: false };
      const db = mockMongoDb;
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = { dupe: "duplicate" };
      const dupeProp = undefined;
      const result = await checkDupesPromise(
        config,
        db,
        dbobj,
        query,
        sort,
        collection,
        dupeObject,
        dupeProp
      );
      expect(result).toEqual(dupeObject);
    });

    it("checkDupes temperature duplicate not found ", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          callback(null, null);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        tempInFarenheit: 12.3,
        humidity: 45.2,
        utc_timestamp: "20180724"
      };
      const dupeProp = { tempInFarenheit: 0, humidity: 0 };

      const result = await checkDupesPromise(
        config,
        db,
        dbobj,
        query,
        sort,
        collection,
        dupeObject,
        dupeProp
      );

      expect(result).toEqual(dupeObject);
    });

    it("checkDupes temperature duplicate found", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          let databaseData = {
            sensorId: "00000",
            tempInFarenheit: 12.3,
            humidity: 45.2,
            utc_timestamp: "20180724"
          };
          callback(null, databaseData);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        tempInFarenheit: 12.3,
        humidity: 45.2,
        utc_timestamp: "20180724"
      };
      const dupeProp = { tempInFarenheit: 0, humidity: 0 };

      try {
        await checkDupesPromise(
          config,
          db,
          dbobj,
          query,
          sort,
          collection,
          dupeObject,
          dupeProp
        );
      } catch (e) {
        expect(e).toEqual("duplicate");
      }
    });

    it("checkDupes temperature duplicate not found", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          let databaseData = {
            sensorId: "00000",
            tempInFarenheit: 12.3,
            humidity: 45.2,
            utc_timestamp: "20180724"
          };
          callback(null, databaseData);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        tempInFarenheit: 45.3,
        humidity: 65.2,
        utc_timestamp: "20180724"
      };
      const dupeProp = { tempInFarenheit: 0, humidity: 0 };

      const result = await checkDupesPromise(
        config,
        db,
        dbobj,
        query,
        sort,
        collection,
        dupeObject,
        dupeProp
      );
      expect(result).toEqual(dupeObject);
    });

    it("checkDupes door duplicate not found ", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          callback(null, null);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        isOpen: false,
        utc_timestamp: "20180724"
      };
      const dupeProp = { isOpen: 0 };

      const result = await checkDupesPromise(
        config,
        db,
        dbobj,
        query,
        sort,
        collection,
        dupeObject,
        dupeProp
      );

      expect(result).toEqual(dupeObject);
    });

    it("checkDupes door duplicate found", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          let databaseData = {
            sensorId: "00000",
            isOpen: false,
            utc_timestamp: "20180724"
          };
          callback(null, databaseData);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        isOpen: false,
        utc_timestamp: "20180724"
      };
      const dupeProp = { isOpen: 0 };

      try {
        await checkDupesPromise(
          config,
          db,
          dbobj,
          query,
          sort,
          collection,
          dupeObject,
          dupeProp
        );
      } catch (e) {
        expect(e).toEqual("duplicate");
      }
    });

    it("checkDupes door duplicate not found", async () => {
      const config = { NoDuplicateData: true };
      const db = {
        queryLastData: function(dbobj, query, sort, collection, callback) {
          let databaseData = {
            sensorId: "00000",
            isOpen: false,
            utc_timestamp: "20180724"
          };
          callback(null, databaseData);
        }
      };
      const dbobj = mockDB.all();
      const query = undefined;
      const sort = undefined;
      const collection = undefined;
      const dupeObject = {
        sensorId: "00000",
        isOpen: true,
        utc_timestamp: "20180724"
      };
      const dupeProp = { isOpen: 0 };

      const result = await checkDupesPromise(
        config,
        db,
        dbobj,
        query,
        sort,
        collection,
        dupeObject,
        dupeProp
      );
      expect(result).toEqual(dupeObject);
    });
  });
});
