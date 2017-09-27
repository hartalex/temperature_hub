module.exports = function (app) {
  app.get('/', function (req, res) {
  res.render('main', { title: 'Hub', jsFile: 'index.js' }) })
  app.get('/menu', function (req, res) {
  res.render('main', { title: 'Menu Entry', jsFile: 'menu.js' }) })
}
