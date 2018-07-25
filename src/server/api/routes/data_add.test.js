import { init } from "../data/data";
var mockSuccess = require("../data/mock-success");
var mockFail = require("../data/mock-fail");
var mockmongodb = require("../db/mock-mongodb");
const mockdata = init(mockmongodb);
const dataAdd = require("./data_add");
const doTest = require("./do_test");

describe("data_add", function() {
  describe("#function (req, res)", function() {
    it("dataAdd door success - no mock", function(done) {
      var input = {
        sensorId: "test",
        isOpen: true
      };
      doTest(
        done,
        dataAdd,
        {
          body: input,
          data: mockSuccess
        },
        {
          status: 200,
          result: "ok",
          data: input
        }
      );
    });

    it("dataAdd data missing failure", function(done) {
      doTest(
        done,
        dataAdd,
        {
          body: {}
        },
        {
          status: 500,
          result: "fail",
          reason: "sensorId is not a string"
        }
      );
    });

    it("dataAdd door success", function(done) {
      var input = { isOpen: true };
      doTest(
        done,
        dataAdd,
        {
          body: input,
          data: mockSuccess
        },
        {
          status: 200,
          result: "ok",
          data: input
        }
      );
    });

    it("dataAdd door failure", function(done) {
      doTest(
        done,
        dataAdd,
        {
          body: {},
          data: mockFail
        },
        {
          status: 500,
          result: "fail",
          reason: "mock error"
        }
      );
    });

    it("dataAdd door failure", function(done) {
      doTest(
        done,
        dataAdd,
        {
          body: null,
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Input is null"
        }
      );
    });

    it("dataAdd temp success - no mock", function(done) {
      var input = { id: " ", t: 65 };
      doTest(
        done,
        dataAdd,
        {
          body: input,
          data: mockSuccess
        },
        {
          status: 200,
          result: "ok",
          data: input
        }
      );
    });
    it("dataAdd temp success", function(done) {
      var input = { id: "" };
      doTest(
        done,
        dataAdd,
        {
          body: input,
          data: mockSuccess
        },
        {
          status: 200,
          result: "ok",
          data: input
        }
      );
    });

    it("dataAdd temp failure", function(done) {
      doTest(
        done,
        dataAdd,
        {
          body: {
            id: ""
          },
          data: mockFail
        },
        {
          status: 500,
          result: "fail",
          reason: "mock error"
        }
      );
    });

    it("dataAdd temp failure", function(done) {
      doTest(
        done,
        dataAdd,
        {
          body: null,
          data: mockdata
        },
        {
          status: 500,
          result: "fail",
          reason: "Input is null"
        }
      );
    });
  });
});
