var mockDataSuccess = require('../data/mock-data-success')
var mockDataFail = require('../data/mock-data-fail')
const dataAdd = require('../../server/api/routes/data_add')
const doTest = require('./do_test')

describe('data_add', function () {
  describe('#function (req, res)', function () {
    
    it('dataAdd success', function (done) {
      doTest(done, dataAdd, {body: {}, data: mockDataSuccess}, {status:200, result: 'ok'})
    })

    it('dataAdd failure', function (done) {
       doTest(done, dataAdd, {body: {}, data: mockDataFail}, {status:500, result: 'fail', reason: 'mock error'})
    })
    
    it('dataAdd failure', function (done) {
       doTest(done, dataAdd, {body: null}, {status:500, result: 'fail', reason: 'Input is null'})
    })
  
  })
})
