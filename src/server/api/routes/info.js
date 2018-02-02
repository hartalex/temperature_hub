module.export = function (req, res) {
  res.json({commit: process.env.COMMIT, tag: process.env.TAG})
}
