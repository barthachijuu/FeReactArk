const chalk = require('chalk');
const logger = require('../../server/utils/logger');
const utils = require('../utils/fileUtils');

/**
 * Bootstrap Project Generator
 */

module.exports = {
  description: 'Add the main container component and all the scaffold structure',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Choose a name for the container',
    },
  ],
  actions: () => {
    // Generate scaffolding
    const bootstrapTemplate = './bootstrap/templates/bootstrap.js.hbs';
    const mainTemplate = './bootstrap/templates/main.js.hbs';
    const containerTemplate = './bootstrap/templates/container.js.hbs';
    const languageTemplate = './bootstrap/templates/language.js.hbs';
    const routeTemplate = './bootstrap/templates/route.js.hbs';
    const storeTemplate = './bootstrap/templates/store.js.hbs';
    const boundaryTemplate = './bootstrap/templates/boundary.js.hbs';
    const apiTemplate = './bootstrap/templates/api.js.hbs';
    const methodTemplate = './bootstrap/templates/functions.js.hbs';

    const actions = [
      chalk.blueBright(`Starting creation process`),
      logger.delayLog('Retrieve all inputs'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      (data) => {
        console.log(chalk.green('[SUCEESS]'));
        logger.info(data);
      },
      {
        type: 'add',
        path: '../app/containers/MainContainer.jsx',
        templateFile: mainTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/containers/{{properCase name}}Container.jsx',
        templateFile: containerTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/utils/LanguageProvider.jsx',
        templateFile: languageTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}utils/tests/language.test.js`,
        templateFile: './bootstrap/templates/test.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/index.jsx',
        templateFile: bootstrapTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/routes/index.jsx',
        templateFile: routeTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/store/createStore.js',
        templateFile: storeTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/api/index.js',
        templateFile: apiTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/utils/ErrorBoundary.jsx',
        templateFile: boundaryTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}utils/tests/errortest.test.js`,
        templateFile: './bootstrap/templates/errortest.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../app/utils/globalMethods.js',
        templateFile: methodTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}utils/tests/globaltest.test.js`,
        templateFile: './bootstrap/templates/globaltest.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
    ];
    actions.push({
      type: 'fallbacklang',
      path: '/translations/',
      lang: ['lang-it'],
    });
    actions.push({
      type: 'prettify',
      path: '',
      options: '--trailing-comma all --print-width 120 --single-quote',

    });
    if (utils.getDirectoryContent('containers').length === 0) {
      return actions;
    }
    console.clear();
    return [`The container is already present in the project.\n
    If you want to change the container, please exec \`yarn reinit\` to clean the project.`];
  },
};
