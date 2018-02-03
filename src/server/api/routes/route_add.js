module.exports = function(func, res, done) {
  return func.then(function(output) {
    res.status(200)
    res.json(output)
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  }).catch(function(err) {
    res.status(500)
    res.json({
      result: 'fail',
      reason: err
    })
    /* istanbul ignore next */
    if (done && typeof done === 'function') {
      done()
    }
  })
}
