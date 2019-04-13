const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackPlugin = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../web/src');
const mainConfig = require('./webpack.config');
const project = require('../config/project.config');

mainConfig.entry.main = [
  '@babel/polyfill',
  `${APP_DIR}/index.jsx`,
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
];
mainConfig.output.filename = 'main.js';
mainConfig.output.path = path.join(__dirname, '../dist');
mainConfig.output.publicPath = project.prod_server.assetsPublicPath;
const minifyOpts = {
  removeConsole: true,
  removeDebugger: true,
};

const pluginOpts = {};

module.exports = merge(mainConfig, {
  devtool: false,
  plugins: [
    new WebpackPlugin.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin(minifyOpts, pluginOpts),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
      filename: `index.html`,
      inject: true,
    }),
    new PurifyCSSPlugin({
      styleExtensions: ['.css', '.scss'],
      moduleExtensions: ['.html'],
      purifyOptions: {
        info: true,
        rejected: false,
        minify: true,
      },
      paths: glob.sync(path.join(__dirname, '../web/src/*.html')),
    }),
  ],
  optimization: project.webpack.prodoptimization,
});
