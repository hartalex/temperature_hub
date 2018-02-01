var simple = require('simple-mock')

module.exports = {
  remove: function () {
    simple.mock(this, 'collection').returnWith({remove: function (obj, query, callback) { callback(null, {})}})
    return this
  },
  insert: function () {
    simple.mock(this, 'collection').returnWith({insert: function (obj, query, callback) { callback(null, {})}})
    return this
  },
}
