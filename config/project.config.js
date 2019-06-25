const chalk = require('chalk');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { argv } = require('yargs');

console.log(chalk.bgGreen(chalk.black('###   Creating default configuration.   ###\n')));
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: argv.mode || 'development',
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'assets',
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  dev_server: {
    assetsPublicPath: '/web/assets',
    port: process.env.PORT || 4000,
  },
  prod_server: {
    assetsPublicPath: '/dist',
  },
  monitor: {
    target: 'monitor/stats.json',
    port: process.env.MONITOR_PORT || 9001,
  },

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_devtool_dev: 'cheap-module-source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    assets: true,
    colors: true,
    version: true,
    timings: true,
    chunks: true,
    chunkModules: true,
  },

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [{
    type: 'text-summary',
  },
  {
    type: 'lcov',
    dir: 'coverage',
  },
  ],
};

/*
  -------------------------------------------------
  All Internal Configuration Below
  Edit at Your Own Risk
  -------------------------------------------------
  ***********************************************
  */

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __INT__: /integration/.test(config.env),
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
};
// ------------------------------------
// Utilities
// ------------------------------------
function base(...args) {
  const arg = [config.path_base].concat(args);
  return path.resolve(...arg);
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  client_help_desk: base.bind(null, config.dir_client_help_desk),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
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
      minimize: process.env.NODE_ENV === 'production',
    },
  },
  MiniCssLoader: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: process.env.NODE_ENV === 'development',
      modules: true,
      sourceMap: process.env.NODE_ENV === 'development',
      localIdentName: '[name]_[local]_[hash:base64:5]',
      minimize: false, // process.env.NODE_ENV === 'production',
      reloadAll: true,
    },
  },
  postCSSLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: process.env.NODE_ENV === 'development',
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
      sourceMap: true,
    },
  },
  devoptimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 0,
      minChunks: 2,
      automaticNameDelimiter: '~',
      hidePathInfo: true,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        styles: {
          name: false,
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  prodoptimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
// ========================================================
// Environment Configuration
// ========================================================
console.log(chalk.bgGreen(chalk.blue(`Looking for environment overrides for NODE_ENV "${config.env}".`)));
const environments = require('./environments.config');

const overrides = environments[config.env];
if (overrides) {
  console.log(chalk.bgGreen(chalk.red('Found overrides, applying to default configuration.')));
  Object.assign(config, overrides(config));
} else {
  console.log(chalk.bgRed(chalk.white('No environment overrides found, defaults will be used.')));
}

module.exports = config;
