const path = require('path');
const merge = require('webpack-merge');
const WebpackPlugin = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mainConfig = require('./webpack.config');
const project = require('../config/project.config');

const APP_DIR = path.resolve(__dirname, '../web/src');

mainConfig.entry.main = [
  '@babel/polyfill',
  `${APP_DIR}/index.jsx`,
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
];
mainConfig.output.filename = 'main.js';
mainConfig.output.path = path.join(__dirname, '../web/src');
mainConfig.output.publicPath = '/';

module.exports = merge(mainConfig, {
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({ filename: '[id].css', allChunks: false, disable: false, chunkFilename: '[id].css' }),
    new WebpackPlugin.optimize.OccurrenceOrderPlugin(),
    new WebpackPlugin.HotModuleReplacementPlugin(),
    new WebpackPlugin.NoEmitOnErrorsPlugin(),
    new WebpackPlugin.SourceMapDevToolPlugin(),
    new WebpackPlugin.HashedModuleIdsPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'expanded',
    }),
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
      filename: `index.html`,
      inject: 'body',
      title: 'test title',
    }),
  ],
  optimization: project.webpack.devoptimization,
});
