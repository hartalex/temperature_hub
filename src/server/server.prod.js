import path from 'path';
const cache = require('express-cache-headers');
var expressWinston = require('express-winston');
var winston = require('winston');
var express = require('express');
var webRoutes = require('./client/routes');
var http = require('http');
const log = new winston.Logger({
  transports: [new winston.transports.Console({timestamp: true})],
});

const port = 8220;

const app = express();
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
app.set('view engine', 'ejs');

app.use(cache(300));
webRoutes(app);

app.use(
  '/img',
  cache(3600),
  express.static(path.join(__dirname, '/../client/img')),
);
app.use('/js', cache(0), express.static(path.join(__dirname, '/../client/js')));

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

http.createServer(app).listen(port);
log.info(`Starting server on http://localhost:${port}`);
