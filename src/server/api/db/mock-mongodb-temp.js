var simple = require('simple-mock')

module.exports = {
  init: function () {
    var mockdb = {}
    simple.mock(mockdb, 'close')
    simple.mock(this, 'connect').resolveWith({ close: function () {} })
    simple.mock(this, 'queryLastData').callbackWith({tempInFarenheit: 0})
    simple.mock(this, 'queryOneData').callbackWith({})
    simple.mock(this, 'insertData').rejectWith({})
    return this
  }
}.init()
