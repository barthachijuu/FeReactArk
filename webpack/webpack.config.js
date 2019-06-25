const path = require('path');
const WebpackPlugin = require('webpack');
const argv = require('yargs').parse();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const project = require('../config/project.config');

const MODE = argv.mode || 'development';
const APP_DIR = path.resolve(__dirname, '../web/src');

process.noDeprecation = true;
module.exports = {
  mode: MODE,
  devServer: {
    // Don't refresh if hot loading fails. Good while
    // implementing the client interface.
    hot: true,
    compress: true,
    // If you want to refresh on errors too, set
    open: true,
    inline: true,
    contentBase: path.resolve(__dirname, '../'),
  },
  target: 'web',
  entry: {},
  context: APP_DIR,
  output: {
    chunkFilename: '[name].js',
  },
  watch: true,
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Api: `${APP_DIR}/api`,
      Components: `${APP_DIR}/components`,
      Mocks: `${APP_DIR}/mocks`,
      Store: `${APP_DIR}/store`,
      Route: `${APP_DIR}/routes`,
      Root: path.resolve(__dirname, '../'),
      Utility: `${APP_DIR}/utility`,
    },
  },
  module: {
    rules: [{
      test: /\.(html|htm|xhtml|ejs|hbs)$/,
      use: [project.webpack.templateLoader],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    },
    {
      test: /\.(sc|sa|c)ss$/,
      use: [
        MODE === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            outputStyle: 'compressed',
            includePaths: ['./node_modules'],
          },
        },
        { loader: 'sass-resources-loader',
          options: {
            sourceMap: true,
            resources: [`${path.resolve(__dirname, '../web/assets')}/styles/scss/variables.scss`, `${path.resolve(__dirname, '../web/assets')}/styles/scss/mixins.scss`],
          },
        },
      ],
    },
    {
      test: /\.module\.scss$/,
      use: [
        MODE === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        project.webpack.CSSModuleLoader,
        project.webpack.postCSSLoader,
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      ],
    },
    {
      test: /\.svg(\?.*)?$/,
      loader: 'url-loader',
      options: {
        prefix: 'fonts/',
        name: '[name].[ext]',
        limit: '10000',
        mimetype: 'image/svg+xml',
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        prefix: 'fonts/',
        name: '[name].[ext]',
        limit: '10000',
        mimetype: 'font/opentype',
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
    new WebpackPlugin.HotModuleReplacementPlugin(),
    new WebpackPlugin.DefinePlugin(project.globals),
    new CopyWebpackPlugin([{ from: `${path.resolve(__dirname, '../web/assets')}` }]), // Add this in the plugins section
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: project.path_base,
      map: (file) => {
        file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        return file;
      },
    }),
  ],
  performance: {
    maxAssetSize: 512000, // int (in bytes),
    maxEntrypointSize: 512000, // int (in bytes)
    assetFilter: assetFilename => assetFilename.endsWith('.css') || assetFilename.endsWith('.js') || assetFilename.endsWith('.jsx'),
  },
};
