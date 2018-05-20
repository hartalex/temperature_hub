const db = require('../../db/mongodb')()
const config = require('../../../config')
const slack = require('../../data/slack')(config.slackUrl)
const errorHandler = require('../errorHandler')(slack)
const finish = require('../done')

module.exports = (req, res, done) => {
  // Use connect method to connect to the Server
  var dbobj = req.db
    return new Promise((resolve, reject) => {
      db.queryData(dbobj, {}, 'services', (err, svcs ) => {
        if (err) {
          throw err;
        }
        for (var i = 0; i < svcs.length; i++) {
          delete svcs[i]._id
        }
        resolve(svcs)
      })
  }).then((result) => {
    res.json({'result':'ok', 'data':result})
    res.status(200)
    finish(done)
  }).catch(errorHandler(req, res, done))
}
