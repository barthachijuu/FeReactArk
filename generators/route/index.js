const utils = require('../utils/fileUtils');

/**
 * Route Generator
 */

module.exports = {
  description: 'Add a single route for project',
  prompts: [
    {
      type: 'input',
      name: 'routeName',
      message: 'What should it be called',
      validate: (value) => {
        if (/.+/.test(value)) {
          return utils.checkExist(`routes/${utils.pascalize(value)}`) ? 'That route already exists.' : true;
        }
        return 'The name is required.';
      },
    },
    {
      type: 'confirm',
      name: 'isExact',
      bvmessage: 'Is path exact',
      default: false,
    },
    {
      type: 'confirm',
      name: 'isLazy',
      message: 'Should the route be lazy loaded?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'isAuth',
      message: 'Should the route be accesbile only if you are logged?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'hasHistory',
      message: 'Should the route have access to history?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'wantActions',
      message: 'Should the route have his own actions?',
      default: true,
    },
    {
      type: 'input',
      name: 'actionsList',
      message: 'Type one or more action list requests (separate by comma the name or leave it blank for an empty file)',
      filter: (input) => {
        if (input.length > 0) {
          return input.split(',');
        }
        return undefined;
      },
      when: a => a.wantActions === true,
    },
    {
      type: 'input',
      name: 'actions',
      message: 'Type one or more action requests (separate by comma the name or leave it blank for an empty file)',
      filter: (input) => {
        if (input.length > 0) {
          return input.split(',');
        }
        return undefined;
      },
      when: a => a.wantActions === true,
    },
    {
      type: 'confirm',
      name: 'wantReducer',
      message: 'Should the component have his own reducer?',
      default: true,
      when: a => a.wantActions === true,
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      message: 'Should the component have his own saga?',
      default: true,
      when: a => a.wantActions === true,
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/components/{{properCase routeName}}.jsx`,
        templateFile: './route/templates/component.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/components/{{properCase routeName}}Container.js`,
        templateFile: './route/templates/container.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/tests/index.test.js`,
        templateFile: './route/templates/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/index.js`,
        templateFile: './route/templates/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/RootComponent.jsx`,
        templateFile: './route/templates/root.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}api/{{camelCase routeName}}/{{camelCase routeName}}.js`,
        templateFile: './route/templates/api.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}mocks/{{camelCase routeName}}/{{camelCase routeName}}.js`,
        templateFile: './route/templates/mock.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.isAuth) {
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
    if (data.isLazy) {
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

    if (data.wantActions) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Actions.js`,
        templateFile: './route/templates/action.js.hbs',
      });
    }

    if (data.wantReducer) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Reducers.js`,
        templateFile: './route/templates/reducer.js.hbs',
      });
    }

    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/{{properCase routeName}}/modules/{{properCase routeName}}Sagas.js`,
        templateFile: './route/templates/sagas.js.hbs',
      });
    }

    actions.push({
      type: 'prettify',
      path: '/routes/',
      options: '--trailing-comma all --print-width 120 --single-quote',
    });

    return actions;
  },
};
