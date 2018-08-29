const finish = require('./api/routes/done')

module.exports = function(res, done) {
  return function(result) {
    res.json({ result: 'ok', data: result })
    res.status(200)
    finish(done)
  }
}
