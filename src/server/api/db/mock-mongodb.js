var simple = require('simple-mock')

module.exports = {
  init: function () {
    var mockdb = {}
    simple.mock(mockdb, 'close')
    simple.mock(this, 'connect').resolveWith({ close: function () {} })
    simple.mock(this, 'queryData').callbackWith(null)
    simple.mock(this, 'querydistinctData').callbackWith(null)
    simple.mock(this, 'queryOneData').callbackWith()
    simple.mock(this, 'queryLastData').callbackWith(null)
    simple.mock(this, 'queryAggregateData').callbackWith(null)
    simple.mock(this, 'insertData', function(obj) {
      return new Promise(function(resolve, reject) {
        resolve(obj)
      })
    })
    simple.mock(this, 'deleteData').callbackWith({n: 1})
    return this
  }
}.init()
