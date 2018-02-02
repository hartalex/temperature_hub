const error = 'error'
module.exports = {
  connect: function () {
    return {connect: function (url, callback) { callback(null, {}) }}
  },
  connectFail: function () {
    return {connect: function (url, callback) { callback(error, {}) }}
  }
}