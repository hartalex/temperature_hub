
module.exports = function (slackUrl) {
  return {
    SlackPost: function (message) {
      return new Promise(
        function (resolve, reject) {
            resolve(message)
          })
        }
    }
  }
