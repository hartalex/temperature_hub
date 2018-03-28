var assert = require('assert')
const slack = require('../../../../server/api/data/slack')
describe('slack', function() {
  describe('#slack(url)', function() {
    it('slack success', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message = {
        message : 'message'
      }
      var req = {
        method : 'method',
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })

    it('slack success req.method is undefined', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message = {
        message : 'message'
      }
      var req = {
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })
    it('slack success req.url is undefined', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message = {
        message : 'message'
      }
      var req = {
        method : 'method'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })

    it('slack success req is undefined', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message = {
        message : 'message'
      }
      var req = undefined
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })

    it('slack message is error success', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message  = new Error('message')
      var req = {
        method : 'method',
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })

    it('slack mock request success', function() {
      var mockRequestSuccess = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 200
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestSuccess)
      var message  = new Error('message')
      var req = {
        method : 'method',
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })
    it('slack mock request fail', function() {
      var mockRequestFail = function (obj, callback) {
        var error = false
        var response = {
          statusCode : 500
        }
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestFail)
      var message  = new Error('message')
      var req = {
        method : 'method',
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      }).catch((error) => {
        assert.equal(error.message, 'Error: false statusCode: 500 body: undefined')
      })
    })

    it('slack mock request fail response undefined', function() {
      var mockRequestFail = function (obj, callback) {
        var error = false
        var response = undefined
        var body = undefined
        callback(error, response, body)
      }
      var slackObj = slack(null, mockRequestFail)
      var message  = new Error('message')
      var req = {
        method : 'method',
        url : 'url'
      }
      var retval = 'retval'
      return slackObj.SlackPost(message, req, retval).then((ret) => {
        assert.equal(retval, ret)
      })
    })

  })
})
