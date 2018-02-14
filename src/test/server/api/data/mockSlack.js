var simple = require('simple-mock')
module.exports = function (slackUrl) {
  var mockObj = {}
    simple.mock(mockObj, 'SlackPost', function(message, req, obj) {
        return new Promise(
        function (resolve, reject) {
            resolve(obj)
          })
        }
    )
    return mockObj
  }
