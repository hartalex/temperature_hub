var simple = require('simple-mock')

module.exports = {
  init: function () {
    simple.mock(this, 'connect').resolveWith({ close: function () {} })
    simple.mock(this, 'queryOneData').callbackWith(null)
    simple.mock(this, 'insertData').rejectWith('db error')
    return this
  }
}.init()
