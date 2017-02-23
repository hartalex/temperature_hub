const data = require('../data/data')

module.exports = {
  'data': data,
  route: function (req, res, done) {
    var mydata = this.data
    var dataAdd = mydata.dataAdd(req.body)
    dataAdd.then(function (output) {
      res.status(200)
      res.json(output)
      if (done && typeof done === 'function') {
        done()
      }
    }).catch(function (err) {
      res.status(500)
      res.json({result: 'fail', reason: err})
      if (done && typeof done === 'function') {
        done()
      }
    })
  }
}
