const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('../../webpack.dev.config');
const path = require('path');
const expressWinston = require('express-winston');
const express = require('express');
const webRoutes = require('./client/routes');
const winston = require('winston');
const app = express();

const log = new winston.Logger({
  transports: [new winston.transports.Console({timestamp: true})],
});

const port = 8080;

app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      quiet: false,
      noInfo: false,
      stats: {
        colors: true,
      },
    }),
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        msg: 'HTTP {{req.method}} {{req.url}}',
        colorize: true,
        timestamp: true,
      }),
    ],
  }),
);

webRoutes(app);

app.use(express.static(path.join(__dirname, '/../client/')));
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        timestamp: true,
      }),
    ],
  }),
);
log.info(`Starting server on http://localhost:${port}`);
app.listen(port);
