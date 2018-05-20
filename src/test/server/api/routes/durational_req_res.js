const durationalReqRes = require('../../../../server/api/routes/durational_req_res')
const assert = require('assert')
const doTest = require('./do_test')

describe('durational_req_res', function() {
  describe('#durational_req_res (duration)', function() {
    it('default', function(done) {
      var req = {
        params: {}
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('callbackError', function(done) {
      var req = {
        params: {}
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        const error = 'callback error'
        callback(error, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 500,
        result: 'fail',
        reason: 'callback error'
      })
    })

    it('1h', function(done) {
      var req = {
        params: {
          duration: '1h'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('12h', function(done) {
      var req = {
        params: {
          duration: '12h'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('24h', function(done) {
      var req = {
        params: {
          duration: '24h'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('3d', function(done) {
      var req = {
        params: {
          duration: '3d'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('7d', function(done) {
      var req = {
        params: {
          duration: '7d'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('14d', function(done) {
      var req = {
        params: {
          duration: '14d'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('28d', function(done) {
      var req = {
        params: {
          duration: '28d'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('12m', function(done) {
      var req = {
        params: {
          duration: '12m'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })


    it('1m', function(done) {
      var req = {
        params: {
          duration: '1m'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })


    it('3m', function(done) {
      var req = {
        params: {
          duration: '3m'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('6m', function(done) {
      var req = {
        params: {
          duration: '6m'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 200,
        result: 'ok',
        data: []
      })
    })

    it('unhandled duration', function(done) {
      var req = {
        params: {
          duration: '00'
        }
      }
      var data = []
      const dummyFunction = function(db, number, callback) {
        callback(null, data)
      }
      doTest(done, durationalReqRes.durational_req_res(dummyFunction, dummyFunction, dummyFunction).bind(durationalReqRes), req, {
        status: 500,
        result: 'fail',
        reason: 'Duration could not be handled 00'
      })
    })
  })

  describe('#validateDuration (duration)', function() {

    it('default', function() {
      assert.equal(durationalReqRes.validateDuration(''), '1h')
    })

    it('1h', function() {
      var duration = '1h'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('12h', function() {
      var duration = '12h'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('24h', function() {
      var duration = '24h'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('3d', function() {
      var duration = '3d'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('7d', function() {
      var duration = '7d'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('14d', function() {
      var duration = '14d'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('28d', function() {
      var duration = '28d'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('1m', function() {
      var duration = '1m'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('3m', function() {
      var duration = '3m'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('6m', function() {
      var duration = '6m'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('12m', function() {
      var duration = '12m'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })

    it('reject duration', function() {
      var duration = '00'
      assert.equal(durationalReqRes.validateDuration(duration), duration)
    })
  })
})
