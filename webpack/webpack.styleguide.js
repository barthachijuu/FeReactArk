// webpack.common.js - common webpack config
const path = require('path');
const project = require('../config/project.config');

const APP_DIR = path.resolve(__dirname, '../app');
process.noDeprecation = true;
module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: {},
  context: APP_DIR,
  output: {
    chunkFilename: '[id].js',
  },
  watch: true,
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Api: `${APP_DIR}/api`,
      Components: `${APP_DIR}/components`,
      Root: path.resolve(__dirname, '../'),
      Store: `${APP_DIR}/store`,
      Utility: `${APP_DIR}/utils`,
    },
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          sourceType: 'unambiguous',
        },
      },
    },
    {
      test: /\.(sc|sa)ss$/,
      use: [
        'style-loader',
        project.webpack.CSSModuleLoader,
        {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'development',
            excludePaths: ['./node_modules'],
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|webp|svg(\?.*)?)$/,
      use: project.webpack.imageLoader.dev,
    },
    {
      test: /\.(woff|woff2?|eot|ttf|otf)$/i,
      loader: 'file-loader',
      include: [/fonts/],
      options: {
        prefix: 'fonts/',
        name: '[name].[ext]',
        limit: '10000',
        mimetype: 'font/opentype',
      },
    },
    ],
  },
};
