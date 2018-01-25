var simple = require('simple-mock')

module.exports = {
  init: function () {
    var mockdb = {}
    simple.mock(mockdb, 'close')
    simple.mock(this, 'connect').returnWith(new Promise(function (resolve, reject) {
      resolve({ close: function () {} })
    }))

    simple.mock(this, 'queryData').callbackWith(null)
    simple.mock(this, 'querydistinctData').callbackWith(null)
    simple.mock(this, 'queryOneData').callbackWith(null)
    simple.mock(this, 'queryLastData').callbackWith(null)
    simple.mock(this, 'queryAggregateData').callbackWith(null)
    simple.mock(this, 'insertData').returnWith(new Promise(function (resolve, reject) {
      reject('db error')
    }))
    simple.mock(this, 'deleteData').callbackWith({result: {n: 1}})
    return this
  }
}.init()
