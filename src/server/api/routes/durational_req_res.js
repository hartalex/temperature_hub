const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')
const finish = require('./done')

module.exports = function (hours, days, months) {
  var slack = slackPost(config.slackUrl)
  return function (req, res, done) {
  var duration
  if ('duration' in req.params) {
    duration = req.params.duration
  }
  duration = validateDuration(duration)
  // Use connect method to connect to the Server
    var dbobj = req.db
    return new Promise(function (resolve, reject) {
      if (duration === '1h') {
        hours(dbobj, 1, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '12h') {
        hours(dbobj, 12, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '24h') {
        hours(dbobj, 24, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '3d') {
        days(dbobj, 3, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '7d') {
        days(dbobj, 7, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '14d') {
        days(dbobj, 14, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '28d') {
        days(dbobj, 28, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '1m') {
        months(dbobj, 1, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '3m') {
        months(dbobj, 3, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '6m') {
        months(dbobj, 6, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else if (duration === '12m') {
        months(dbobj, 12, function (error, temps) {
          if (error) {
            throw error;
          }
          resolve(temps)
        })
      } else {
        reject('Duration could not be handled' + duration)
      }
  }).then(function (result) {
    res.json(result)
    finish(done)
  })
  .catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.json([])
    finish(done)
  })
}
}

function validateDuration (duration) {
  const validDurations = ['1h', '12h', '24h', '3d', '7d', '14d', '28d', '1m', '3m', '6m', '12m']
  var retval = validDurations[0]
  if (validDurations.indexOf(duration) !== -1) {
    retval = validDurations[validDurations.indexOf(duration)]
  }
  return retval
}
