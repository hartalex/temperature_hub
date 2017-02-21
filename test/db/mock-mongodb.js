var simple = require('simple-mock')

module.exports = {
  init: function () {
    var mockdb = {}
    simple.mock(mockdb, 'close')
    simple.mock(this, 'connect').callbackWith(null, mockdb)
    simple.mock(this, 'queryData').callbackWith([])
    simple.mock(this, 'querydistinctData').callbackWith([])
    simple.mock(this, 'queryOneData').callbackWith({})
    simple.mock(this, 'queryLastData').callbackWith([])
    simple.mock(this, 'queryAggregateData').callbackWith([])
    simple.mock(this, 'insertData').callbackWith({result: {n: 1}})
    simple.mock(this, 'deleteData').callbackWith({result: {n: 1}})
    return this
  }
}.init()
