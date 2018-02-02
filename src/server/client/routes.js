module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('mainBlack', { title: 'Hub', jsFile: 'index.js' }) })
  app.get('/menuEntry', function (req, res) {
    res.render('mainWhite', { title: 'Menu Entry', jsFile: 'menuEntry.js' }) })
  app.get('/memoryEntry', function (req, res) {
    res.render('mainWhite', { title: 'Memory Entry', jsFile: 'memoryEntry.js' }) })
}
