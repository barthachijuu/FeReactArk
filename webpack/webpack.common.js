// webpack.common.js - common webpack config
const path = require('path');
const WebpackPlugin = require('webpack');
const MCEP = require('mini-css-extract-plugin');
const { argv } = require('yargs');
const project = require('../config/project.config');

const APP_DIR = project.paths.app;
process.noDeprecation = true;
module.exports = {
  mode: process.env.NODE_ENV,
  entry: Object.assign({
    main: [
      '@babel/polyfill',
      path.join(process.cwd(), '/app/index.jsx'),
    ],
  }),
  output: Object.assign({
    path: argv.type === 'build' ? project.paths.build : project.paths.dist,
    publicPath: '/',
  }),
  watch: process.env.NODE_ENV === 'development',
  resolve: {
    alias: {
      Api: `${APP_DIR}/api`,
      Components: `${APP_DIR}/components`,
      Context: `${APP_DIR}/context`,
      Images: `${APP_DIR}/images`,
      Mocks: `${APP_DIR}/mocks`,
      Root: project.paths.base,
      Route: `${APP_DIR}/routes`,
      Store: `${APP_DIR}/store`,
      Svg: `${APP_DIR}/svg`,
      Translations: `${APP_DIR}/translations`,
      Utility: `${APP_DIR}/utils`,
    },
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main'],
    modules: ['node_modules'],
  },
  module: {
    rules: [{
      test: /\.(html|htm|xhtml|ejs|hbs)$/,
      // use: [project.webpack.templateLoader],
    },
    {
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
      test: /\.(sc|sa|c)ss$/,
      use: [
        process.env.NODE_ENV === 'development' ? 'style-loader' : MCEP.loader,
        project.webpack.CSSModuleLoader,
        {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'development',
            includePaths: ['./node_modules'],
          },
        },
      ],
    },
    {
      test: /\.module\.scss$/,
      use: [
        process.env.NODE_ENV === 'development' ? 'style-loader' : MCEP.loader,
        project.webpack.CSSModuleLoader,
        project.webpack.postCSSLoader,
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jpe?g|gif|webp|svg(\?.*)?)$/,
      use: process.env.NODE_ENV === 'development' ? project.webpack.imageLoader.dev : project.webpack.imageLoader.prod,
    },
    {
      test: /\.(txt|htaccess)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
    {
      test: /\.(woff|woff2?|eot|ttf|otf)$/i,
      loader: 'file-loader',
      options: {
        outputPath: 'fonts/',
        name: '[name].[ext]',
        limit: '10000',
        mimetype: 'font/opentype',
        publicPath: '/',
      },
    },
    ],
  },
  node: {
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    new WebpackPlugin.DefinePlugin(project.globals),
  ],
  performance: {
    hints: process.env.NODE_ENV === 'development' ? 'warning' : false,
  },
};
