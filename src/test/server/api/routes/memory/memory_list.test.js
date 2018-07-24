const memoryList = require('../../../../../server/api/routes/memory/memory_list')
const mockdb = require('../../db/mock-db')
const mockSlack = require('../../data/mockSlack')('url')
const doTest = require('../do_test')
describe('memory_list', function() {
  describe('#memory (req, res)', function() {
    it('success return empty object', function(done) {
      var req = {
        db: mockdb.queryLastData(),
        slack: mockSlack,
        params: {} }

        doTest(done, memoryList, req, {
          status: 200,
          result: 'ok',
          data: {}
        })
    })

    it('success with date param', function(done) {
      var req = {
        db: mockdb.queryLastData(),
        slack: mockSlack,
        params: {date:''} }

        doTest(done, memoryList, req, {
          status: 200,
          result: 'ok',
          data: {}
        })
    })

    it('success return object', function(done) {
      var req = {
        db: mockdb.queryLastData(mockdb.mockDbObject),
        slack: mockSlack,
        params: {} }

        doTest(done, memoryList, req, {
          status: 200,
          result: 'ok',
          data: {}
        })
    })
    it('fail', function(done) {
      var req = {
        db: mockdb.queryLastDataFail(),
        slack: mockSlack,
        params: {} }
        doTest(done, memoryList, req, {
          status: 500,
          result: 'fail',
          reason: 'error'
        })
    })
  })
})
