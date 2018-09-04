const path = require('path')
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'build', 'index.html'))
  })
  app.get('/service-worker.js', function(req, res) {
    res.sendFile(
      path.join(__dirname, '..', '..', '..', 'build', 'service-worker.js')
    )
  })
  app.get('/menuEntry', function(req, res) {
    res.render('mainWhite', { title: 'Menu Entry', jsFile: 'menuEntry.js' })
  })
  app.get('/memoryEntry', function(req, res) {
    res.render('mainWhite', { title: 'Memory Entry', jsFile: 'memoryEntry.js' })
  })
}
