const path = require('path');
const merge = require('webpack-merge');
const MCEP = require('mini-css-extract-plugin');
const WP = require('webpack');
const HWP = require('html-webpack-plugin');
const MP = require('webpack-manifest-plugin');
const CP = require('compression-webpack-plugin');
const OCAP = require('optimize-css-assets-webpack-plugin');
const IWWP = require('imagemin-webp-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const TP = require('terser-webpack-plugin');
const OP = require('offline-plugin');
const mainConfig = require('./webpack.common');
const project = require('../config/project.config');
const pkg = require('../package.json');

mainConfig.entry.main = [
  '@babel/polyfill',
  path.join(process.cwd(), '/app/index.jsx'),
];
mainConfig.output.filename = '[name].[chunkhash].js';
mainConfig.output.chunkFilename = '[name].[chunkhash].chunk.js';

module.exports = merge(mainConfig, {
  plugins: [
    new WP.optimize.OccurrenceOrderPlugin(),
    new MCEP({
      filename: '[name].[chunkhash].css',
    }),
    new MP({
      fileName: 'manifest.json',
      basePath: project.path_base,
      map: (file) => {
        file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        return file;
      },
    }),
    new OCAP({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
        safe: true,
        discardComments: true,
      },
    }),
    new HWP({
      title: pkg.name.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s|\-/g, ''),
      filename: `index.html`,
      template: `${process.cwd()}/app/index.ejs`,
      inject: true,
      scriptLoading: 'defer',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      showErrors: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        'X-UA-Compatible': 'IE=9;IE=10;IE=Edge,chrome=1',
        // Will generate:   <meta http-equiv="X-UA-Compatible" content="IE=9;IE=10;IE=Edge,chrome=1" >
      },
    }),
    new OP({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),
    new CP({
      filename: '[path].gz[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
      compressionOptions: {
        numiterations: 15,
        level: 9,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
    }),
    new IWWP({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 80,
        },
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
    new WP.HashedModuleIdsPlugin({
      context: process.cwd(),
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
  optimization: {
    minimizer: [
      new TP({
        terserOptions: {
          parse: {},
          ecma: 2017,
          compress: {
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        cache: true,
        parallel: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-intl|react-redux|redux-saga|react-router)[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `reactVendor-${packageName.replace('@', '')}`;
          },
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `commons-${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  performance: {
    hints: false,
    maxAssetSize: 512000, // int (in bytes),
    maxEntrypointSize: 512000, // int (in bytes)
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
