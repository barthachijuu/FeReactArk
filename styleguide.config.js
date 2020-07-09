const path = require('path');

const webPackPath = require('./webpack/webpack.styleguide');

const spaceFactor = 8;

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'app/utils/styleguide/Wrapper'),
    LogoRenderer: path.join(__dirname, 'app/utils/styleguide/components/Logo'),
    StyleGuideRenderer: path.join(__dirname, 'app/utils/styleguide/components/StyleGuide'),
    SectionsRenderer: path.join(__dirname, '/app/utils/styleguide/components/SectionsRenderer'),
  },
  showSidebar: true,
  components: './app/components/**/*.jsx',
  webpackConfig: webPackPath,
  skipComponentsWithoutExample: true,
  ignore: ['./app/components/**/languageModule.jsx'],
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Helvetica', 'sans-serif'],
    space: [
      spaceFactor / 2, // 4
      spaceFactor, // 8
      spaceFactor * 2, // 16
      spaceFactor * 3, // 24
      spaceFactor * 4, // 32
      spaceFactor * 5, // 40
      spaceFactor * 6, // 48
    ],
    color: {
      light: '#767676',
      lightest: '#ccc',
      link: '#FFF',
      linkHover: '#00ff73',
      focus: 'rgba(22, 115, 177, 0.25)',
      border: '#e8e8e8',
      name: '#690',
      type: '#905',
      error: '#c00',
      baseBackground: '#fff',
      codeBackground: '#f5f5f5',
      sidebarBackground: '#f5f5f5',
      ribbonBackground: '#e90',
      ribbonText: '#fff',
      // Based on default Prism theme
      codeBase: '#333',
      codeComment: '#6d6d6d',
      codePunctuation: '#999',
      codeProperty: '#905',
      codeDeleted: '#905',
      codeString: '#690',
      codeInserted: '#690',
      codeOperator: '#9a6e3a',
      codeKeyword: '#1673b1',
      codeFunction: '#DD4A68',
      codeVariable: '#e90',
    },
    fontFamily: {
      base: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
    },
    fontSize: {
      base: 15,
      text: 16,
      small: 13,
      h1: 48,
      h2: 36,
      h3: 24,
      h4: 18,
      h5: 16,
      h6: 16,
    },
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.jsx');
    return `import { ${name} } from 'Components/${name}';`;
  },
};
