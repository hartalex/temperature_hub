const serviceList = require('../../../../../server/api/routes/services/service_list')
const mockdb = require('../../db/mock-db')
const mockSlack = require('../../data/mockSlack')('url')
const doTest = require('../do_test')
describe('service_list', function() {
  describe('#service (req, res)', function() {
    it('success return empty array', function(done) {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack }

        doTest(done, serviceList, req, {
          status: 200,
          result: 'ok',
          data: []
        })
    })
    it('success return object array', function(done) {
      var req = {
        db: mockdb.queryData(mockdb.mockDbObject),
        slack: mockSlack }

        doTest(done, serviceList, req, {
          status: 200,
          result: 'ok',
          data: [{}]
        })
    })
    it('fail', function(done) {
      var req = {
        db: mockdb.queryDataFail(),
        slack: mockSlack }
        doTest(done, serviceList, req, {
          status: 500,
          result: 'fail',
          reason: 'error'
        })
    })
  })
})
