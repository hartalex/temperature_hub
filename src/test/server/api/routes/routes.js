const routes = require('../../../../server/api/routes/routes')
var assert = require('assert')

describe('routes', function() {
  describe('#function (app)', function() {
    it('app counts', function() {
      var getCnt = 0
      var postCnt = 0
      var app = {
        get:function(txt1, obj1, obj2) {
          getCnt++
        },
        post:function(txt1, obj1, obj2) {
          postCnt++
        }
      }
      routes(app)
      assert.equal(getCnt, 17)
      assert.equal(postCnt, 6)
    })
  })
})
