var mockSuccess = require('../data/mock-success')
var mockFail = require('../data/mock-fail')
var mockmongodb = require('../db/mock-mongodb')
const mockdata = require('../../../../server/api/data/data')(mockmongodb)
const dataAdd = require('../../../../server/api/routes/data_add')
const doTest = require('./do_test')

describe('data_add', function() {
  describe('#function (req, res)', function() {
    it('dataAdd door success - no mock', function(done) {
      doTest(done, dataAdd, {
        body: { sensorId: 'test',
          isOpen: true },
          data: mockSuccess
      }, {
        status: 200,
        result: 'ok'
      })
    })

    it('dataAdd door success', function(done) {
      doTest(done, dataAdd, {
        body: {},
        data: mockSuccess
      }, {
        status: 200,
        result: 'ok'
      })
    })

    it('dataAdd door failure', function(done) {
      doTest(done, dataAdd, {
        body: {},
        data: mockFail
      }, {
        status: 500,
        result: 'fail',
        reason: 'mock error'
      })
    })

    it('dataAdd door failure', function(done) {
      doTest(done, dataAdd, {
        body: null,
        data: mockdata
      }, {
        status: 500,
        result: 'fail',
        reason: 'Input is null'
      })
    })

    it('dataAdd temp success - no mock', function(done) {
      doTest(done, dataAdd, {
        body: {
          id: ' ',
          t: 65
        },
        data: mockSuccess
      }, {
        status: 200,
        result: 'ok'
      })
    })
    it('dataAdd temp success', function(done) {
      doTest(done, dataAdd, {
        body: {
          id: ''
        },
        data: mockSuccess
      }, {
        status: 200,
        result: 'ok'
      })
    })

    it('dataAdd temp failure', function(done) {
      doTest(done, dataAdd, {
        body: {
          id: ''
        },
        data: mockFail
      }, {
        status: 500,
        result: 'fail',
        reason: 'mock error'
      })
    })

    it('dataAdd temp failure', function(done) {
      doTest(done, dataAdd, {
        body: null,
        data: mockdata
      }, {
        status: 500,
        result: 'fail',
        reason: 'Input is null'
      })
    })
  })
})
