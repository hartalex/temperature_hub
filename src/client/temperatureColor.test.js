import Colors from './colors'
import temperatureColor from './temperatureColor'
import assert from 'assert'

describe('temperatureColor', () => {
  it('0', () => {
    assert.equal(temperatureColor(0), Colors.White)
  })
  it('less than = 63 - -1', () => {
    assert.equal(temperatureColor(-1), Colors.SoftBlue)
  })
  it('less than = 63 - 1', () => {
    assert.equal(temperatureColor(1), Colors.SoftBlue)
  })
  it('less than = 63 - 63', () => {
    assert.equal(temperatureColor(63), Colors.SoftBlue)
  })
  it('Greater than 75 - 64', () => {
    assert.equal(temperatureColor(64), Colors.SoftGreen)
  })
  it('Greater than 75 - 75', () => {
    assert.equal(temperatureColor(75), Colors.SoftGreen)
  })
  it('Greater than 75 - 76', () => {
    assert.equal(temperatureColor(76), Colors.SoftRed)
  })
  it('Greater than 75 - 100', () => {
    assert.equal(temperatureColor(100), Colors.SoftRed)
  })
})
