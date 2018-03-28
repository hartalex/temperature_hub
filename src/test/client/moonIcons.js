import moon0 from '../../client/moonIcons/moon0.gif'
var assert = require('assert')
var moonIcons = require('../../client/moonIcons')

describe('moonIcons', () => {
  it('0', () => {
    assert.equal(moonIcons(0), moon0)
  })
})
