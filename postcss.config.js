const { resolve } = require('path');
const project = require('./config/project.config.js'); // eslint-disable-line
const autoprefixer = require('autoprefixer')({
  browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 10'],
});

const fontMagician = require('postcss-font-magician')({
  variants: {
    'Roboto Condensed': {
      300: [],
      400: [],
      '400i': [],
      700: [],
    },
  },
  foundries: ['google'],
});

const fontSetOptions = {
  inline: ['woff2'],
  path: resolve(__dirname, './public/assets/fonts/'), // folder to save all font files. Required absolute path!
  formats: ['woff2', 'woff'],
  filename: '[css-name]-[set-name].[hash:4].[ext]',
  url({ fontName }) {
    return fontName;
  },
};

const postcssIcon = require('postcss-icon')({
  'postcss-icon.material-design': {
    ...fontSetOptions,
    prefix: 'md-',
  },
});

module.exports = ctx => ({
  parser: ctx.parser ? 'postcss-js' : false,
  sourceMap: ctx.env === 'development' ? ctx.map : false,
  plugins: [
    autoprefixer,
    fontMagician,
    postcssIcon,
  ],
});
