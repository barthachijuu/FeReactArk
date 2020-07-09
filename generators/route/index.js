const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');
/**
 * Route Generator
 */

module.exports = {
  description: 'Add a single route for project',
  prompts: [{
    type: 'input',
    name: 'routeName',
    message: 'What should it be called',
    validate: (value) => {
      if (/^[^a-zA-Z]+$/.test(value)) {
        return logger.warn('The name can use only letter.');
      }
      if (/.+/.test(value)) {
        return utils.checkExist(`routes/${utils.pascalize(value)}`) ? logger.warn('That route already exists.') : true;
      }
      return logger.warn('The name is required.');
    },
  },
  {
    name: 'choicees',
    type: 'checkbox',
    message: 'What do you want to include?',
    default: ['lazy', 'auth'],
    choices: [
      {
        name: 'Authorized route',
        value: 'auth',
      },
      {
        name: 'Exact path route',
        value: 'exact',
      },
      {
        name: 'History access',
        value: 'history',
      },
      {
        name: 'Lazy loaded route',
        value: 'lazy',
      },
    ],
  },
  {
    name: 'options',
    type: 'checkbox',
    message: 'What do you want to include as extra?',
    default: ['action'],
    choices: [{
      name: 'Route Actions',
      value: 'action',
    },
    {
      name: 'Route Sagas',
      value: 'saga',
    },
    {
      name: 'A language intl file',
      value: 'lang',
    },
    ],
  },
  {
    type: 'input',
    name: 'actionsList',
    message: `Type one or more action list requests
    ${logger.log(`(separate by comma the name or leave it blank for an empty file)`)}`,
    filter: (input) => {
      if (input.length > 0) {
        return input.split(',');
      }
      return undefined;
    },
    when: a => a.options.includes('action'),
  },
  {
    type: 'input',
    name: 'actions',
    message: `Type one or more actions
    ${logger.log(`(separate by comma the name or leave it blank for an empty file)`)}`,
    filter: (input) => {
      if (input.length > 0) {
        return input.split(',');
      }
      return undefined;
    },
    when: a => a.options.includes('action'),
  }],
  actions: (data) => {
    data.uname = utils.getAuthor();
    data.since = utils.getDate();
    const actions = [
      logger.log(`Starting route creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Writing route'),
      (data) => {
        logger.success('[SUCEESS]');
        logger.info(data);
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/components/{{properCase routeName}}.jsx`,
        templateFile: './route/templates/component.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/components/{{properCase routeName}}Container.js`,
        templateFile: './route/templates/container.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/tests/{{properCase routeName}}.test.js`,
        templateFile: './route/templates/test.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/index.js`,
        templateFile: './route/templates/index.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/RootComponent.jsx`,
        templateFile: './route/templates/root.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}api/{{camelCase routeName}}/{{camelCase routeName}}.js`,
        templateFile: './route/templates/api.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}mocks/{{camelCase routeName}}/{{camelCase routeName}}.js`,
        templateFile: './route/templates/mock.js.hbs',
      },
      {
        type: 'add',
        path: `../app/routes/{{properCase routeName}}/components/style.js`,
        templateFile: `./route/templates/styles.cssjs.hbs`,
        skipIfExists: true,
      }];

    if (data.choicees.includes('auth')) {
      actions.push({
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: /(\/\/ @generator routes:define:auth)/gm,
        templateFile: './route/templates/route.js.hbs',
      });
    } else {
      actions.push({
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: /(\/\/ @generator routes:define:unauth)/gm,
        templateFile: './route/templates/route.js.hbs',
      });
    }
    if (data.choicees.includes('lazy')) {
      actions.push({
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: /(\/\/ @generator routes:import)[^*]+(\/\/ @generator routes:component export)[^*]/gm,
        templateFile: './route/templates/lazy-import.js.hbs',
      });
    } else {
      actions.push({
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: /(\/\/ @generator routes:import)[^*]/gm,
        templateFile: './route/templates/async-import.js.hbs',
      });
    }
    if (data.options.includes('action')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Actions.js`,
        templateFile: './route/templates/action.js.hbs',
      }, {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Reducers.js`,
        templateFile: './route/templates/reducer.js.hbs',
      });
    }
    if (data.options.includes('saga')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Sagas.js`,
        templateFile: './route/templates/sagas.js.hbs',
      });
    }
    if (data.options.includes('action')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/tests/{{properCase routeName}}Action.test.js`,
        templateFile: './route/templates/actiontest.js.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/tests/{{properCase routeName}}Reducer.test.js`,
        templateFile: './route/templates/reducertest.js.hbs',

      });
    }
    if (data.options.includes('saga')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/tests/{{properCase routeName}}Saga.test.js`,
        templateFile: './route/templates/sagatest.js.hbs',

      });
    }
    if (data.options.includes('lang')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/components/languageModule.jsx`,
        templateFile: './route/templates/language.jsx.hbs',
        skipIfExists: true,
      });
    }
    actions.push({
      type: 'createdir',
      path: '/mocks/',
      options: '--trailing-comma all --print-width 120 --single-quote',
    });
    actions.push({
      type: 'prettify',
      path: '/routes/',
      options: '--trailing-comma all --print-width 120 --single-quote',
    });
    return actions;
  },
};
