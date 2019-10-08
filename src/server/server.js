import express from 'express';
import cache from 'express-cache-headers';
import expressWinston from 'express-winston';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import webpackConfig from '../../webpack.dev.config';
import webRoutes from './client/routes';

const winstonConsoleBase = {
  colorize: true,
  timestamp: true,
};

const log = new winston.Logger({
  transports: [new winston.transports.Console(winstonConsoleBase)],
});

const {
  env: {NODE_ENV},
} = process;

const port = 8080;

const app = express();

app.set('view engine', 'ejs');

if (NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
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
        ...winstonConsoleBase,
        msg: 'HTTP {{req.method}} {{req.url}}',
      }),
    ],
  }),
);

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
        ...winstonConsoleBase,
        json: true,
      }),
    ],
  }),
);
log.info(`Starting server on http://localhost:${port}`);
app.listen(port);
