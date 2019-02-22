const finish = require('./done')
module.exports = function (req, res, done) {
  res.status(200).json({commit: process.env.COMMIT, tag: process.env.TAG})
  finish(done)
}
