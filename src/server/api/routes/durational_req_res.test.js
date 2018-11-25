const durationalReqRes = require("./durational_req_res");
const assert = require("assert");
const doTest = require("./do_test");
const mockdb = require("../db/mock-db").all();

describe("durational_req_res", function() {
  describe("#durational_req_res (duration)", function() {
    function goodTest(done, req) {
      const dummyQueryFunction = function(
        lastOldestTime,
        timeStampCompareLength
      ) {
        return [{}];
      };
      doTest(
        done,
        durationalReqRes
          .durational_req_res(dummyQueryFunction, "collection")
          .bind(durationalReqRes),
        req,
        {
          status: 200,
          result: "ok",
          data: [{}]
        }
      );
    }

    it("default", function(done) {
      var req = {
        params: {},
        db: mockdb
      };
      goodTest(done, req);
    });

    for (let i = 0; i < durationalReqRes.validDurations.length - 1; i++) {
      it(durationalReqRes.validDurations[i], function(done) {
        var req = {
          params: {
            duration: durationalReqRes.validDurations[i]
          },
          db: mockdb
        };
        goodTest(done, req);
      });
    }

    it("unhandled duration", function(done) {
      var req = {
        params: {
          duration: "00"
        },
        db: mockdb
      };
      const dummyQueryFunction = function(
        lastOldestTime,
        timeStampCompareLength
      ) {
        return [{}];
      };
      doTest(
        done,
        durationalReqRes
          .durational_req_res(dummyQueryFunction, "collection")
          .bind(durationalReqRes),
        req,
        {
          status: 500,
          result: "fail",
          reason: "Duration could not be handled 00"
        }
      );
    });
  });

  describe("#validateDuration (duration)", function() {
    it("default", function() {
      assert.equal(durationalReqRes.validateDuration(""), "1h");
    });

    for (let i = 0; i < durationalReqRes.validDurations.length; i++) {
      it(durationalReqRes.validDurations[i], function() {
        assert.equal(
          durationalReqRes.validateDuration(durationalReqRes.validDurations[i]),
          durationalReqRes.validDurations[i]
        );
      });
    }
  });
});
