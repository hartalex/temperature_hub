var simple = require('simple-mock')
module.exports = function (slackUrl) {
  var mockObj = {}
    simple.mock(mockObj, 'SlackPost', function(message) {
        return new Promise(
        function (resolve, reject) {
            resolve(message)
          })
        }
    )
    return mockObj
  }
