const routes = require("./routes");
var assert = require("assert");
var mockMongoDB = require("../db/mock-mongodb");

describe("routes", function() {
  describe("#function (app)", function() {
    it("app counts", function() {
      var getCnt = 0;
      var postCnt = 0;
      var useCnt = 0;
      var app = {
        get: function(txt1, obj1, obj2) {
          getCnt++;
        },
        post: function(txt1, obj1, obj2) {
          postCnt++;
        },
        use: function(txt1, obj1, obj2) {
          useCnt++;
        }
      };
      return routes(app, mockMongoDB).then(function() {
        assert.equal(getCnt, 18);
        assert.equal(postCnt, 6);
        assert.equal(useCnt, 1);
      });
    });
  });
});
