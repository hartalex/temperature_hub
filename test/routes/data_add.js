var assert = require('assert')
var data = require('../../api/data/data')

describe('data', function () {
  describe('#dataAdd(input, output)', function () {
    it('dataAdd fails', function () {
      var input = {}
      var output = {}
      data.dataAdd(input, output)
      console.log(output)
      assert.equal(output.result, 'fail')
    })
  })
})
