const utils = require('../utils/fileUtils');

/**
 * Bootstrap Project Generator
 */

module.exports = {
  description: 'Add a main container component',
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
    const boundaryStyle = `body { margin: 0; } .bigBody { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; width: 100vw; background-color: rgba(149, 150, 175, 0.3); } .body { display: flex; flex-direction: column; justify-content: center; text-align: center; .detailsButton { white-space: pre-wrap; outline: none; margin-top: 20px; &:focus { outline: none; } } } `;
    const apiTemplate = './bootstrap/templates/api.js.hbs';

    const actions = [
      {
        type: 'add',
        path: '../web/src/containers/MainContainer.jsx',
        templateFile: mainTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/containers/{{properCase name}}Container.jsx',
        templateFile: containerTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/utility/LanguageProvider.jsx',
        templateFile: languageTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}utility/tests/language.test.js`,
        templateFile: './bootstrap/templates/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../web/src/index.jsx',
        templateFile: bootstrapTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/routes/index.jsx',
        templateFile: routeTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/store/createStore.js',
        templateFile: storeTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/api/index.js',
        templateFile: apiTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../web/src/utility/ErrorBoundary.jsx',
        templateFile: boundaryTemplate,
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}utility/tests/errortest.test.js`,
        templateFile: './bootstrap/templates/errortest.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../web/assets/styles/scss/ErrorBoundary.scss',
        template: boundaryStyle,
        abortOnFail: true,
        skipIfExists: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: '/web/src/',
      options: '--trailing-comma all --print-width 120 --single-quote',
    });

    actions.push({
      type: 'defaultlang',
      path: '/translations/',
      lang: ['lang-it'],
    });

    if (utils.getDirectoryContent('containers').length === 0) {
      return actions;
    }
    console.clear();
    return ['\nThe container is already present in the project.\nIf you want to change the container, please exec `yarn reinit` to clean the project.'];
  },
};
