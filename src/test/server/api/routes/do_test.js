var assert = require('assert')
var simple = require('simple-mock')
var slackMock = require('../data/mockSlack')()
const logging = require('winston')
module.exports = function doTest(done, func, req, expected) {
  var res = {}
  simple.mock(res, 'status').returnWith(0)
  simple.mock(res, 'json').returnWith(0)
  req.slack = slackMock
  func(req, res, function () {
    try {
      logging.debug('status')
      assert.equal(res.status.lastCall.arg, expected.status)
      logging.debug('result')
      assert.equal(res.json.lastCall.arg.result, expected.result)
      logging.debug('reason')
      assert.equal(res.json.lastCall.arg.reason, expected.reason)
      logging.debug('data')
      assert.deepEqual(res.json.lastCall.arg.data, expected.data)
      done()
    } catch(err) {
       done(new Error(res.json.lastCall.arg.reason + '\n' + err))
     }
   })
  }
