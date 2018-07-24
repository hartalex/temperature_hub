const tempList = require('../../../../../server/api/routes/temperatures/temp_list')
const mockdb = require('../../db/mock-db')
const mockSlack = require('../../data/mockSlack')('url')
const doTest = require('../do_test')
describe('temp_list', function() {
  describe('#temp (req, res)', function() {
    it('success return empty object', function(done) {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack,
        params: {} }

        doTest(done, tempList, req, {
          status: 200,
          result: 'ok',
          data: []
        })
    })

    it('success with sensorId param', function(done) {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack,
        params: {sensorId:''} }

        doTest(done, tempList, req, {
          status: 200,
          result: 'ok',
          data: []
        })
    })

    it('success return object', function(done) {
      var req = {
        db: mockdb.queryData(mockdb.mockDbObject),
        slack: mockSlack,
        params: {} }

        doTest(done, tempList, req, {
          status: 200,
          result: 'ok',
          data: [{}]
        })
    })
    it('fail', function(done) {
      var req = {
        db: mockdb.queryDataFail(),
        slack: mockSlack,
        params: {} }
        doTest(done, tempList, req, {
          status: 500,
          result: 'fail',
          reason: 'error'
        })
    })
  })
})
