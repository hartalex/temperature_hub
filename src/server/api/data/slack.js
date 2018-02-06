

module.exports = function (slackUrl) {
  return {
    SlackPost: function (message) {
      return new Promise(function (resolve, reject) {

        var slackData = {'text': message}
        console.log(slackData)
        fetch(slackUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: slackData
        }).then(function (response) {
          console.log(response)
          if (response.status >= 400) {
            reject('Error statusCode: ' + response.status + ' body: ' + JSON.stringify(response.json()))
          } else {
            resolve(message)
          }
        })
      })
    }
  }
}
