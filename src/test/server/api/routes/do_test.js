var assert = require('assert')
var simple = require('simple-mock')
module.exports = function doTest(done, func, req, expected) {
  var res = {}
  simple.mock(res, 'status').returnWith(0)
  simple.mock(res, 'json').returnWith(0)
  func(req, res, function () {
      assert.equal(res.status.lastCall.arg, expected.status)
      assert.equal(res.json.lastCall.arg.result, expected.result)
      assert.equal(res.json.lastCall.arg.reason, expected.reason)
      done()
  })
}
