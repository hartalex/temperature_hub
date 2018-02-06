
require('isomorphic-fetch')
module.exports = function (slackUrl) {
  return {
    SlackPost: function (message) {
      return new Promise(function (resolve, reject) {
        var slackData = {'text': message}
        fetch(slackUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: slackData
        }).then(function (response) {
          if (response.status >= 400) {
            reject(new Error('Error statusCode: ' + response.statusCode + ' body: ' + response.body))
          } else {
            resolve(response.json())
          }
        })
      })
    }
  }
}
