module.exports = function (req, res, done) {
  res.json({commit: process.env.COMMIT, tag: process.env.TAG})
  done()
}
