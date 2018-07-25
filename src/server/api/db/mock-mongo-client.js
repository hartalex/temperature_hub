const error = 'error'
module.exports = {
  connect: function () {
    return {connect: function (url, callback) { callback(null, {db:function() {return {}}}) }}
  },
  connectFail: function () {
    return {connect: function (url, callback) { callback(error, {db:function() {return {}}}) }}
  }
}
