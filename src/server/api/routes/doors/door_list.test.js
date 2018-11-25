const doorList = require("./door_list");
const mockdb = require("../../db/mock-db");
const mockSlack = require("../../data/mockSlack")("url");
const doTest = require("../do_test");
describe("door_list", function() {
  describe("#door (req, res)", function() {
    it("success return empty object", function(done) {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack,
        params: {}
      };

      doTest(done, doorList, req, {
        status: 200,
        result: "ok",
        data: []
      });
    });

    it("success with sensorId param", function(done) {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack,
        params: { sensorId: "" }
      };

      doTest(done, doorList, req, {
        status: 200,
        result: "ok",
        data: []
      });
    });

    it("success return object", function(done) {
      var req = {
        db: mockdb.queryData(mockdb.mockDbObject),
        slack: mockSlack,
        params: {}
      };

      doTest(done, doorList, req, {
        status: 200,
        result: "ok",
        data: [{}]
      });
    });
    it("fail", function(done) {
      var req = {
        db: mockdb.queryDataFail(),
        slack: mockSlack,
        params: {}
      };
      doTest(done, doorList, req, {
        status: 500,
        result: "fail",
        reason: "error"
      });
    });
  });
});
