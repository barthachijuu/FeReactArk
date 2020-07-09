const path = require('path');
const merge = require('webpack-merge');
const WP = require('webpack');
const HWP = require('html-webpack-plugin');
const MCEP = require('mini-css-extract-plugin');
const mainConfig = require('./webpack.common');
const pkg = require('../package.json');

mainConfig.output.filename = '[name].js';
mainConfig.output.chunkFilename = '[name].chunk.js';

module.exports = merge(mainConfig, {
  devtool: 'eval-source-map',
  plugins: [
    new MCEP({ filename: '[id].css', allChunks: false, disable: false, chunkFilename: '[id].css' }),
    new WP.optimize.OccurrenceOrderPlugin(),
    new WP.HotModuleReplacementPlugin(),
    new WP.NoEmitOnErrorsPlugin(),
    new WP.SourceMapDevToolPlugin(),
    new WP.HashedModuleIdsPlugin(),
    new HWP({
      filename: `index.html`,
      template: `${path.join(process.cwd(), '/app/index.ejs')}`,
      inject: true,
      title: pkg.name.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s|\-/g, ''),
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        'X-UA-Compatible': 'IE=9;IE=10;IE=Edge,chrome=1',
        // Will generate:   <meta http-equiv="X-UA-Compatible" content="IE=9;IE=10;IE=Edge,chrome=1" >
      },
    }),
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
    },
  },
  performance: {
    hints: 'warning',
  },
});
