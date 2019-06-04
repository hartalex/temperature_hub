const routes = require('./routes');
var assert = require('assert');

describe('routes', function() {
  describe('#function (app)', function() {
    it('routes count 3', function() {
      var req = {};
      var cnt = 0;
      var res = {
        render: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      var app = {
        get: function(obj, callback) {
          callback(req, res);
        },
      };
      routes(app);
      assert.equal(cnt, 3);
    });
  });
});
