var assert = require('assert')
var simple = require('simple-mock')
var mockDataSuccess = require('../data/mock-data-success')
var mockDataFail = require('../data/mock-data-fail')
const DataAdd = require('../../api/routes/data_add')

describe('data_add', function () {
  describe('#function (req, res)', function () {
    it('dataAdd success', function (done) {
      var successdataAdd = new DataAdd()
      // use mock data object setup to succeed
      successdataAdd.data = mockDataSuccess
      var req = {body: {}}
      var res = {}
      simple.mock(res, 'status').returnWith(0)
      simple.mock(res, 'json').returnWith(0)
      successdataAdd.route(req, res, function () {
        try {
          assert.equal(res.status.lastCall.arg, 200)
          assert.equal(res.json.lastCall.arg.result, 'ok')
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('dataAdd failure', function (done) {
      var faildataAdd = new DataAdd()
      // use mock data object setup to fail
      faildataAdd.data = mockDataFail
      var req = {body: {}}
      var res = {}
      simple.mock(res, 'status').returnWith(0)
      simple.mock(res, 'json').returnWith(0)
      faildataAdd.route(req, res, function () {
        try {
          assert.equal(res.status.lastCall.arg, 500)
          assert.equal(res.json.lastCall.arg.result, 'fail')
          assert.equal(res.json.lastCall.arg.reason, 'mock error')
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('dataAdd no mock fail', function (done) {
      var normalDataAdd = new DataAdd()
      // normalDataAdd.data = require('../../api/data/data')
      var req = {body: {}}
      var res = {}
      simple.mock(res, 'status').returnWith(0)
      simple.mock(res, 'json').returnWith(0)
      normalDataAdd.route(req, res, function () {
        try {
          assert.equal(res.status.lastCall.arg, 500)
          assert.equal(res.json.lastCall.arg.result, 'fail')
          assert.equal(res.json.lastCall.arg.reason, 'Property id/sensorId is missing')
          done()
        } catch (err) {
          done(err)
        }
      })
    })
  })
})
