require('es6-promise').polyfill()
require('isomorphic-fetch')
const db = require('../db/mongodb')()
const slackPost = require('../data/slack')
const config = require('../../config')
const logging = require('winston')
const finish = require('./done')

module.exports = function (req, res, done) {
var slack = slackPost(config.slackUrl)
  fetch('https://hub.hartcode.com/temp/sensor/list').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server')
    }
    return response.json()
  }).then(function (sensorjson) {
    var retval = []
    var dbobj = req.db
      Promise.all(sensorjson.map(function (sensor) {
        return new Promise(function (resolve, reject) {
          db.queryLastData(dbobj, {sensorId: sensor.sensorId}, {utc_timestamp: -1}, 'temperatures', function (error, temp) {
            if (error) {
              throw error
            }
            if (temp != null) {
              temp.sensorName = sensor.name
              if (new Date() - new Date(temp.utc_timestamp) > 5 * 60000) {
                temp.outdated = true;
              } else {
                temp.outdated = false;
              }
              delete temp._id
              retval.push(temp)
            }
            resolve()
          })
        })
      })).then(function () {
        res.json(retval)
      }).catch(function (err) {
        logging.log('error', req.method + ' ' + req.url, err)
        slack.SlackPost(err, req).catch(function(slackErr) {
          logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
        })
        res.json([])
        finish(done)
      })
  }).catch(function (err) {
    logging.log('error', req.method + ' ' + req.url, err)
    slack.SlackPost(err, req).catch(function(slackErr) {
      logging.log('error', 'slack in '+ req.method + ' ' + req.url, slackErr)
    })
    res.json([])
    finish(done)
  })
}
