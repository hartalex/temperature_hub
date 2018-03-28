const request = require('request')
module.exports = function (slackUrl) {
  return {
    SlackPost: function (message, req, retval) {
      return new Promise(
        function (resolve, reject) {
          var strmsg = ''
          if (typeof req !== 'undefined') {
            if (typeof req.method !== 'undefined') {
              strmsg += req.method
            }
            if (typeof req.url !== 'undefined') {
              strmsg += ' ' + req.url
            }
          }
          if (message instanceof Error) {
            strmsg += message.message
          } else {
            strmsg += JSON.stringify(message)
          }

          var slackData = {'text': strmsg}
          request({
            url: slackUrl,
            method: 'POST',
            json: true,
            body: slackData
          }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              // Sending to Slack was successful
              resolve(retval)
            } else {
              // Sending to Slack failed
              reject(new Error('Error: ' + error + ' statusCode: ' + response.statusCode + ' body: ' + body))
            }
          })
        })
    }
  }
}
