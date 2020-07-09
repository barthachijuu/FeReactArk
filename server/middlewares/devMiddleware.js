/* eslint consistent-return:0 import/order:0 */
const path = require('path');
const webpack = require('webpack');
const hmr = require('webpack-hot-middleware');
const wdm = require('webpack-dev-middleware');
const express = require('express');

function createMiddleware(compiler) {
  return wdm(compiler, {
    publicPath: '/',
    contentBase: 'app',
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
}

function createHotMiddleware(compiler) {
  return hmr(compiler, {
    logLevel: 'warn',
    log: false,
    heartbeat: 10 * 1000,
    stats: 'errors-only',
    action: 'reload',
  });
}


module.exports = function addMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createMiddleware(compiler);
  const hot = createHotMiddleware(compiler);

  app.use(middleware);
  app.use(hot);
  // Start_Login_Conf
  // eslint-disable-next-line global-require
  const webpacklogin = require('../../webpack/webpacklogin');
  const login = webpack(webpacklogin);
  const loginMiddleware = createMiddleware(login);
  const loginHot = createHotMiddleware(login);
  app.use(loginMiddleware);
  app.use(loginHot);
  // End_Login_Conf
  app.use(hmr(compiler, {
    path: '/__webpack_hmr',
  }));

  // force reload page when html-webpack-plugin template changes in\x.html
  // https://github.com/jantimon/html-webpack-plugin
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', () => {
      hot.publish({
        action: 'reload',
      });
    });
  });

  middleware.waitUntilValid(() => {
    if (process.env.NODE_ENV === 'production') {
      console.clear();
    }
  });

  app.use('/images', express.static('images'));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res, next) => {
    if (req.baseUrl.indexOf('login') !== -1) {
      return (next());
    }
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.set('content-type', 'text/html');
        res.send(file);
        res.end();
      }
    });
  });
};
