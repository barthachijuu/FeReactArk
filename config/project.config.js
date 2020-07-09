const chalk = require('chalk');
const path = require('path');
const autoprefixer = require('autoprefixer');
const IG = require('imagemin-gifsicle');
const IM = require('imagemin-mozjpeg');
const IO = require('imagemin-optipng');
const IS = require('imagemin-svgo');

console.log(chalk.bgGreen(chalk.black('### Creating default configuration. ###\n')));
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Path Structure
  // ----------------------------------
  paths: {
    app: path.resolve(process.cwd(), 'app'),
    base: path.resolve(process.cwd(), '/'),
    build: path.resolve(process.cwd(), 'build'),
    clean: [
      '**/*',
    ],
    dist: path.resolve(process.cwd(), 'dist'),
    public: path.resolve(process.cwd(), ''),
  },


  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  devServerConfig: {
    port: 4200,
  },
  prodServerConfig: {
    port: 9000,
  },
  monitor: {
    target: './.monitor/stats.json',
    port: process.env.MONITOR_PORT || 9001,
  },
};
// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __INT__: /integration/.test(config.env),
  __STG__: config.env === 'staging',
  __PROD__: config.env === 'production',
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
};

// ========================================================
// Webpack Loader Configuration
// ========================================================

config.webpack = {
  CSSModuleLoader: {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: process.env.NODE_ENV === 'development',
      localIdentName: '[local]__[hash:base64:5]',
      minimize: true,
      importLoaders: true,
      publicPath: '/',
    },
  },
  postCSSLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: process.env.NODE_ENV === 'development',
      plugins: () => [
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 10'],
        }),
      ],
    },
  },
  templateLoader: {
    loader: 'html-loader',
    options: {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
    },
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      sourceMap: process.env.NODE_ENV === 'development',
    },
  },
  imageLoader: {
    prod: [
      {
        loader: 'url-loader',
        options: {
          publicPath: '/',
          name: '[sha512].[hash].[ext]',
        },
      },
      {
        loader: 'img-loader',
        options: {
          plugins: [
            IG({
              interlaced: true,
            }),
            IM({
              progressive: true,
              arithmetic: false,
            }),
            IO({
              optimizationLevel: 5,
            }),
            IS({
              plugins: [
                { removeTitle: true },
                { convertPathData: false },
              ],
            }),
          ],
        },
      },
    ],
    dev: [
      {
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          publicPath: '/',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            optimizationLevel: 7,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },
};
module.exports = config;
