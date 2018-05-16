const serviceList = require('../../../../../server/api/routes/services/service_list')
const mockdb = require('../../db/mock-db')
const mockSlack = require('../../data/mockSlack')('url')
var assert = require('assert')

describe('service_list', function() {
  describe('#service (req, res)', function() {
    it('success', function() {
      var req = {
        db: mockdb.queryData(),
        slack: mockSlack }
      var res = {json: (tmp) => {},
                 status: function (code) {this.statusid = code}}
      serviceList(req, res)
      assert.equal(res.statusid, 200)
    })
  })
})
