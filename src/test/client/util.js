var assert = require('assert')
var util = require('../../client/util')

describe('util', () => {
  describe('#timeAgo', () => {
    it('1 min', () => {
      assert.equal(util.timeAgo(new Date() - 61000), '1 min')
    })
    it('1 hour', () => {
      assert.equal(util.timeAgo(new Date() - 3600000), '1 hour')
    })
    it('1 sec', () => {
      assert.equal(util.timeAgo(new Date() - 1000), '1 sec')
    })
  })

  describe('#calculateTodayTomorrowNextDay', () => {
    it('Today', () => {
      var expectedDate = new Date((new Date().getTime() + 24 * 0 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10);
      assert.equal(util.calculateTodayTomorrowNextDay('Today'), expectedDate)
    })
    it('Tomorrow', () => {
      var expectedDate = new Date((new Date().getTime() + 24 * 1 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10);
      assert.equal(util.calculateTodayTomorrowNextDay('Tomorrow'), expectedDate)
    })
    it('NextDay', () => {
      var expectedDate = new Date((new Date().getTime() + 24 * 2 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10);
      assert.equal(util.calculateTodayTomorrowNextDay('NextDay'), expectedDate)
    })
    it('empty', () => {
      var expectedDate = new Date((new Date().getTime() + 24 * 0 * 60 * 60 * 1000) - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 10);
      assert.equal(util.calculateTodayTomorrowNextDay(''), expectedDate)
    })
  })
})
