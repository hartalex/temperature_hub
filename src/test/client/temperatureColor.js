import Colors from '../../client/colors'
var assert = require('assert')
var temperatureColor = require('../../client/temperatureColor')

describe('temperatureColor', () => {
  it('0', () => {
    assert.equal(temperatureColor(0), Colors.White)
  })
  it('less than 63 - -1', () => {
    assert.equal(temperatureColor(-1), Colors.SoftBlue)
  })
  it('less than 63 - 1', () => {
    assert.equal(temperatureColor(1), Colors.SoftBlue)
  })
  it('less than 63 - 62', () => {
    assert.equal(temperatureColor(62), Colors.SoftBlue)
  })
  it('less than 75 - 64', () => {
    assert.equal(temperatureColor(64), Colors.SoftGreen)
  })
  it('less than 75 - 74', () => {
    assert.equal(temperatureColor(74), Colors.SoftGreen)
  })
  it('Greater than 75 - 76', () => {
    assert.equal(temperatureColor(76), Colors.SoftRed)
  })
  it('Greater than 75 - 100', () => {
    assert.equal(temperatureColor(100), Colors.SoftRed)
  })
})
