'use strict';

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var apiRoutes = require('../api/routes/routes');

var port = process.env.PORT || 80;
var app = express();

if (process.env.NODE_ENV !== 'production') {
  var compiler = (0, _webpack2.default)(_webpack4.default);
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    quiet: false,
    noInfo: false,
    stats: {
      colors: true
    }
  }));

  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use('/', express.static('web'));

apiRoutes(app);

app.listen(port);