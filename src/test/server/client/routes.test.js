const routes = require('../../../server/client/routes')
var assert = require('assert')

describe('routes', function() {
  describe('#function (app)', function() {
    it('routes count 3', function() {
      var req = {}
      var cnt = 0
      var res = {render:function(txt,obj){
        cnt++
      }}
      var app = {get:function(obj, callback) {
        callback(req, res)
      }}
      routes(app)
      assert.equal(cnt, 3)
    })
  })
})
