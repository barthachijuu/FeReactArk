const utils = require('../utils/fileUtils');

/**
 * Action Generator
 */

module.exports = {
  description: 'Add an extra action for a route or a global one.',
  prompts: [{
    type: 'list',
    name: 'whichAction',
    message: 'Is it a global action or an action for a route? (If you have no routes, global is the only choosable)',
    choices: () => (utils.getDirectoryContent('routes').length > 1 ? ['Global action', 'Route action'] : ['Global action']),
  },
  {
    type: 'list',
    name: 'whichRoute',
    message: 'Which one is the main route?',
    choices: () => {
      const mychoiches = utils.readDir(`${utils.getPath()}routes/`);
      const list = [];
      mychoiches.forEach((m) => {
        if (utils.isDirectory(`${utils.getPath()}routes/${m}`)) {
          list.push(m);
        }
      });
      return list;
    },
    when: answers => answers.whichAction === 'Route action',
  },
  {
    type: 'list',
    name: 'isActionNew',
    message: 'Do you want to create a new action file or add an action to an already existing file? (If you have no actions, new is the only choosable)',
    choices: () => (utils.readDir(`${utils.getPath()}store/actions/`).length > 1 ? ['New action file', 'Add an action'] : ['New action file']),
    when: answers => answers.whichAction === 'Global action',
  },
  {
    type: 'list',
    name: 'whichActionFile',
    message: 'Which action file do you want to extend?',
    choices: () => {
      const mychoiches = utils.readDir(`${utils.getPath()}store/actions`);
      const list = [];
      mychoiches.forEach((m) => {
        if (!/index/.test(m)) {
          list.push(m);
        }
      });
      return list;
    },
    when: answers => answers.isActionNew === 'Add an action',
  },
  {
    type: 'input',
    name: 'actionNameNew',
    message: 'What should the action file be called?',
    validate: (value) => {
      if (/.+/.test(value)) {
        return utils.checkExist(`store/actions/${utils.camelize(value)}.js`) ? 'That action file already exists.' : true;
      }
      return 'The name is required.';
    },
    when: answers => answers.isActionNew === 'New action file',
  },
  {
    type: 'input',
    name: 'methodName',
    message: 'What\'s the name of the action?',
    validate: (value, answers) => {
      if (/.+/.test(value) && answers.isActionNew === 'Add an action') {
        return !utils.checkString(`store/actions/${answers.whichActionFile}`, new RegExp(utils.constantize(value), 'gm')) || 'That method already exists.';
      }
      if (/.+/.test(value) && answers.whichAction === 'Route action') {
        return !utils.checkString(`routes/${answers.whichRoute}/modules/${answers.whichRoute}Actions.js`, new RegExp(utils.constantize(value), 'gm')) || 'That method already exists.';
      }
      return 'The name is required.';
    },
    when: answers => answers.isActionNew === 'Add an action' || answers.whichAction === 'Route action',
  },
  {
    type: 'confirm',
    name: 'isRequest',
    message: 'Is it a request?',
    when: answers => answers.isActionNew === 'Add an action' || answers.whichAction === 'Route action',
  },
  {
    type: 'input',
    name: 'actionsList',
    message: 'Do you want to set a list of action request? (separate actions by comma or leave this blank for an empty file)',
    filter: input => (input.length > 0 ? input.split(',') : undefined),
    when: answers => answers.isActionNew === 'New action file',
  },
  {
    type: 'input',
    name: 'actions',
    message: 'Do you want to set a list of actions? (separate actions by comma or leave this blank for an empty file)',
    filter: input => (input.length > 0 ? input.split(',') : undefined),
    when: answers => answers.isActionNew === 'New action file',
  },
  {
    type: 'confirm',
    name: 'newSaga',
    message: 'Do you want to create the global saga for this action  file',
    default: false,
    when: answers => answers.isActionNew === 'New action file',
  },
  ],
  actions: (data) => {
    const addAction = 'action/templates/addAction.js.hbs';
    const addActionRequest = 'action/templates/addActionRequest.js.hbs';
    const addActionTemplate = `${utils.getPath()}store/actions/${data.whichActionFile}`;
    const routeActionFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Actions.js`;
    const importReducers = `${utils.getPath()}store/reducers/index.js`;
    const importReducerTemplate = 'action/templates/importReducer.js.hbs';

    const actions = [];
    if (data.isActionNew === 'New action file') {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/actions/{{camelCase actionNameNew}}.js`,
        templateFile: 'action/templates/action.js.hbs',
        skipIfExists: true,
      });
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/reducers/{{camelCase actionNameNew}}.js`,
        templateFile: 'reducer/reducer.js.hbs',
        skipIfExists: true,
      });
      actions.push({
        type: 'modify',
        path: importReducers,
        pattern: /(\/\/ @generator reducers:import)[^]+(\/\/ @generator reducers:export)[^*]/gm,
        templateFile: importReducerTemplate,
      });
      if (data.newSaga) {
        actions.push({
          type: 'add',
          path: `${utils.getPath()}store/sagas/{{camelCase actionNameNew}}.js`,
          templateFile: 'sagas/templates/sagas.js.hbs',
          skipIfExists: true,
        });
        actions.push({
          type: 'modify',
          path: `${utils.getPath()}store/sagas/index.js`,
          pattern: /(\/\/ @generator sagas:import)[^]+(\/\/ @generator sagas:export)[^*]/gm,
          templateFile: 'action/templates/importSaga.js.hbs',
        });
      }
    }
    if (data.isActionNew === 'Add an action') {
      if (data.isRequest) {
        actions.push({
          type: 'modify',
          path: addActionTemplate,
          pattern: /(\/\/ @generator action:type:request)[^]+(\/\/ @generator action:request)[^*]/gm,
          templateFile: addActionRequest,
        });
      } else {
        actions.push({
          type: 'modify',
          path: addActionTemplate,
          pattern: /(\/\/ @generator action:type)[^]+(\/\/ @generator action)[^*]/gm,
          templateFile: addAction,
        });
      }
      actions.push({
        type: 'prettify-file',
        path: `store/actions/${data.whichActionFile}`,
        options: '--trailing-comma all --print-width 120 --single-quote',
      });
    }
    if (data.whichAction === 'Route action') {
      if (data.isRequest) {
        actions.push({
          type: 'modify',
          path: routeActionFile,
          pattern: /(\/\/ @generator action:route:type:request)[^]+(\/\/ @generator action:route:request)[^*]/gm,
          templateFile: addActionRequest,
        });
      } else {
        actions.push({
          type: 'modify',
          path: routeActionFile,
          pattern: /(\/\/ @generator action:route:type)[^]+(\/\/ @generator action:route)[^*]/gm,
          templateFile: addAction,
        });
      }
      actions.push({
        type: 'prettify-file',
        path: `routes/${data.whichRoute}/modules/${data.whichRoute}Actions.js`,
        options: '--trailing-comma all --print-width 140 --single-quote',
      });
    }

    return actions;
  },
};
