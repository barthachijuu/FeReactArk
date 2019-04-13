const path = require('path');
const merge = require('webpack-merge');
const WebpackPlugin = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMonitor = require('webpack-monitor');
const Visualizer = require('webpack-visualizer-plugin');
const argv = require('yargs').parse();
const mainConfig = require('./webpack.config');
const project = require('../config/project.config');

const APP_DIR = path.resolve(__dirname, '../web/src');
mainConfig.entry.main = [
  '@babel/polyfill',
  `${APP_DIR}/index.jsx`,
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000&reload=true',
];
mainConfig.output.filename = 'main.js';
mainConfig.output.path = project.monitor.assetsPublicPath;
mainConfig.output.publicPath = project.monitor.assetsPublicPath;

module.exports = merge(mainConfig, {
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({ filename: '[id].css', allChunks: false, disable: false, chunkFilename: '[id].css' }),
    new WebpackPlugin.optimize.OccurrenceOrderPlugin(),
    new WebpackPlugin.HotModuleReplacementPlugin(),
    new WebpackPlugin.NoEmitOnErrorsPlugin(),
    new WebpackPlugin.SourceMapDevToolPlugin(),
    new WebpackPlugin.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist', 'monitor']),
    new WebpackMonitor({
      capture: true,
      target: project.monitor.target,
      launch: true,
      port: project.monitor.port,
      purifyOptions: {
        output: path.join(__dirname, '../dist'),
      },
    }),
    new Visualizer({
      filename: path.join(__dirname, '../dist/monitor/statistics.html'),
    }),
    new HtmlWebpackPlugin({
      template: `${path.join(__dirname, '../dist')}/index.html`,
      filename: `index.html`,
      inject: 'body',
    }),
  ],
  optimization: argv.mode === 'production' ? project.webpack.prodoptimization : project.webpack.devoptimization,
});
