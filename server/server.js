require('./utils/check-version')();

const chalk = require('chalk');
const path = require('path');
const history = require('connect-history-api-fallback');
const hmr = require('webpack-hot-middleware');
const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
const { argv } = require('yargs');

const project = require('../config/project.config');
const globalenv = require('../config/global.vars');
const webpackConfig = process.env.NODE_ENV === 'production' ? require('../webpack/webpack.prod') : require('../webpack/webpack.dev');

const env = require(`../config/deployenv/${argv.d || 'development'}`);

webpackConfig.plugins.push(new webpack.DefinePlugin(globalenv));
webpackConfig.plugins.push(new webpack.DefinePlugin(env));

const compiler = webpack(webpackConfig);
const app = express();

app.use(compression());

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, { // eslint-disable-line import/order
  publicPath: '/',
  contentBase: 'web/src',
  hot: true,
  stats: {
    colors: true,
    version: true,
    chunks: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, { // eslint-disable-line import/order
  logLevel: 'warn',
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  stats: 'errors-only',
  action: 'reload',
});

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

// force reload page when html-webpack-plugin template changes in\x.html
// https://github.com/jantimon/html-webpack-plugin
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', () => {
    webpackHotMiddleware.publish({
      action: 'reload',
    });
  });
});

app.use(hmr(compiler, {
  path: '/__webpack_hmr',
}));

// serve static files
app.use(project.dev_server.assetsPublicPath, express.static(path.resolve(__dirname, '../web/src')));

// default port where dev server listens for incoming traffic
app.use(path.join(project.dev_server.assetsPublicPath), express.static(path.resolve(__dirname, '../web/assets')));
console.log(chalk.bgGreen(chalk.black('###   Starting server...   ###')));


webpackDevMiddleware.waitUntilValid(() => {
  if (process.env.NODE_ENV === 'production') {
    console.clear();
  }
});

// use the gzipped bundle
app.get('*.js*', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use(history({}));

app.use(express.static(project.dev_server.assetsPublicPath));

app.use('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(path.join(__dirname, '../web/src/index.html'), (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
    return true;
  });
});
module.exports = app;
