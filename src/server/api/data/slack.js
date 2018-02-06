const request = require('request')
module.exports = function (slackUrl) {
  return {
    SlackPost: function (message) {
      return new Promise(
        function (resolve, reject) {
          var slackData = {'text': message}
          request({
            url: slackUrl,
            method: 'POST',
            json: true,
            body: slackData
          }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              // Sending to Slack was successful
              resolve(message)
            } else {
              // Sending to Slack failed
              reject(new Error('Error: ' + error + ' statusCode: ' + response.statusCode + ' body: ' + body))
            }
          })
        })
    }
  }
}
