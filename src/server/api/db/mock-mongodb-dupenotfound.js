var simple = require('simple-mock')

module.exports = {
  init: function () {
    var mockdb = {}
    simple.mock(mockdb, 'close')
    simple.mock(this, 'connect').resolveWith({ close: function () {} })
    simple.mock(this, 'queryData').callbackWith(null)
    simple.mock(this, 'querydistinctData').callbackWith(null)
    simple.mock(this, 'queryOneData').callbackWith(null)
    simple.mock(this, 'queryAggregateData').callbackWith(null)
    simple.mock(this, 'insertData', function(db, collection, obj) {
      return new Promise(function(resolve, reject) {
        resolve(obj)
      })
    })
    simple.mock(this, 'deleteData').callbackWith({n: 1})
    this.queryLastData= function(db,query,sort,collection, returnme){ returnme({sensorId: 'test', isOpen:false})}
    return this
  }
}.init()
