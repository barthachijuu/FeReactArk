const webpack = require('webpack');
const webpackConfig = require('../../webpack/webpack.common');
const globalenv = require('../../config/global.vars');


/* eslint-disable global-require */

/**
 * Common middleware
 */
module.exports = (app) => {
  webpackConfig.plugins.push(new webpack.DefinePlugin(globalenv));
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const prodMiddlewares = require('./prodMiddleware');
    prodMiddlewares(app);
  } else {
    const webpackConfig = require('../../webpack/webpack.dev');
    const addDevMiddlewares = require('./devMiddleware');
    addDevMiddlewares(app, webpackConfig);
  }
  return app;
};
