module.exports = function (app) {
  app.get('/', function (req, res) {
  res.render('main', { title: 'Hub', jsFile: 'index.js' }) })
  app.get('/menuEntry', function (req, res) {
  res.render('main', { title: 'Menu Entry', jsFile: 'menuEntry.js' }) })
}
