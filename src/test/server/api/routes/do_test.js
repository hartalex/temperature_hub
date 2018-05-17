var assert = require('assert')
var simple = require('simple-mock')
var slackMock = require('../data/mockSlack')()
module.exports = function doTest(done, func, req, expected) {
  var res = {}
  simple.mock(res, 'status').returnWith(0)
  simple.mock(res, 'json').returnWith(0)
  req.slack = slackMock
  func(req, res, function () {
    try {
      assert.equal(res.status.lastCall.arg, expected.status)
      assert.equal(res.json.lastCall.arg.result, expected.result)
      assert.equal(res.json.lastCall.arg.reason, expected.reason)
      assert.deepEqual(res.json.lastCall.arg.data, expected.data)
      done()
    } catch(err) {
       done(new Error(res.json.lastCall.arg.reason + '\n' + err))
     }
   })
  }
