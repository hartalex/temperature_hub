const requestDefault = require('request')
module.exports = function (slackUrl, request) {
  if (typeof request === 'undefined') {
    request = requestDefault
  }
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
            if (!error && typeof response !== 'undefined' && response.statusCode && response.statusCode === 200) {
              // Sending to Slack was successful
              resolve(retval)
            } else {
              // Sending to Slack failed
              var errorString ='Error: ' + error;
              if (typeof response !== 'undefined' && response.statusCode) {
                errorString += ' statusCode: ' + response.statusCode;
              }
              if (typeof body !== 'undefined') {
                errorString += ' body: ' + body;
              }
              reject(new Error(errorString))
            }
          })
        })
    }
  }
}
