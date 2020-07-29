const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');

/**
 * Action Generator
 */

module.exports = {
  description: 'Add an extra action for a route or a global one.',
  prompts: [{
    type: 'list',
    name: 'whichAction',
    message: `Is it a global action or an action for a route?
    ${logger.log('(If you have no routes, global is the only choosable)')}`,
    choices: () => (utils.getDirectoryContent('routes').length > 1
      ? ['Global action', 'Route action'] : ['Global action']),
  },
  {
    type: 'rawlist',
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
    message: `Do you want to create a new action file or add an action to an already existing file?
    ${logger.log('(If you have no routes, new is the only choosable)')}`,
    choices: () => (utils.readDir(`${utils.getPath()}store/actions/`).length > 1
      ? ['New action file', 'Add an action'] : ['New action file']),
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
        if (!/index|tests/.test(m)) {
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
      if (/^[^a-zA-Z]+$/.test(value)) {
        return logger.warn('The name can use only letter.');
      }
      if (/.+/.test(value)) {
        return utils.checkExist(`store/actions/${utils.camelize(value.toLowerCase())}.js`)
          ? logger.warn('That action file already exists.') : true;
      }
      return logger.warn('The name is required.');
    },
    when: answers => answers.isActionNew === 'New action file',
  },
  {
    type: 'confirm',
    name: 'isRequest',
    message: 'Is it a request?',
    when: answers => answers.isActionNew === 'Add an action' || answers.whichAction === 'Route action',
  },
  {
    type: 'input',
    name: 'methodName',
    message: 'What\'s the name of the action?',
    validate: (value, answers) => {
      if (/.+/.test(value) && answers.isActionNew === 'Add an action') {
        return !utils.checkString(`store/actions/${answers.whichActionFile}`, new RegExp(`${answers.isRequest
          ? utils.constantize(value)
          : utils.constantize(`do ${value}`)}`, 'gm')) || logger.warn('That method already exists.');
      }
      if (/.+/.test(value) && answers.whichAction === 'Route action') {
        return !utils.checkString(`routes/${answers.whichRoute}/modules/${answers.whichRoute}Actions.js`,
          new RegExp(`${answers.isRequest ? utils.constantize(`do ${value}`)
            : utils.constantize(value)}`, 'gm')) || logger.warn('That method already exists.');
      }
      return logger.warn('The name is required.');
    },
    when: answers => answers.isActionNew === 'Add an action' || answers.whichAction === 'Route action',
  },
  {
    type: 'confirm',
    name: 'reducerHandle',
    message: 'Want to handle the reducer state?',
    when: answers => answers.methodName.length > 0,
  },
  {
    type: 'input',
    name: 'actionsList',
    message: `Do you want to set a list of action request?
    ${logger.log('(separate actions by comma or leave this blank for an empty file)')}`,
    filter: input => (input.length > 0 ? input.split(',') : undefined),
    when: answers => answers.isActionNew === 'New action file',
  },
  {
    type: 'input',
    name: 'actions',
    message: `Do you want to set a list of actions?
    ${logger.log('(separate actions by comma or leave this blank for an empty file)')}`,
    filter: input => (input.length > 0 ? input.split(',') : undefined),
    when: answers => answers.isActionNew === 'New action file',
  }],
  actions: (data) => {
    data.since = utils.getDate();
    data.uname = utils.getAuthor();
    const addAction = 'actions/templates/addAction.js.hbs';
    const addActionRequest = 'actions/templates/addActionRequest.js.hbs';
    const addActionTemplate = `${utils.getPath()}store/actions/${data.whichActionFile}`;
    const addReducerTemplate = `${utils.getPath()}store/reducers/${data.whichActionFile}`;
    const routeActionFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Actions.js`;
    const routeReducerFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Reducers.js`;
    const importReducers = `${utils.getPath()}store/reducers/index.js`;
    const importReducerTemplate = 'actions/templates/importReducer.js.hbs';

    const actions = [
      logger.log(`Starting action creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding action'),
      (data) => {
        logger.success('[ACTION ADDED WITH SUCEESS]');
        logger.info(data);
      },
    ];
    if (data.isActionNew === 'New action file') {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/actions/{{camelCase actionNameNew}}.js`,
        templateFile: 'actions/templates/action.js.hbs',
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
        pattern: /(\/\/ @generator reducers:import)[^]+(\/\/ @generator reducers:combine)[^*]/gm,
        templateFile: importReducerTemplate,
      });
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/actions/tests/{{camelCase actionNameNew}}.test.js`,
        templateFile: 'actions/templates/testaction.js.hbs',
        skipIfExists: true,
      });
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/reducers/tests/{{camelCase actionNameNew}}.test.js`,
        templateFile: 'reducer/testreducer.js.hbs',
        skipIfExists: true,
      });
    }
    if (data.isActionNew === 'Add an action') {
      if (data.isRequest) {
        actions.push({
          type: 'modify',
          path: addActionTemplate,
          pattern: /(\/\/ @generator action:type:request)[^]+(\/\/ @generator action:request)[^*]/gm,
          templateFile: addActionRequest,
        },
        {
          type: 'modify',
          path: addReducerTemplate,
          pattern: /(\/\/ @generator reducer:type:action)/gm,
          templateFile: 'reducer/addReducerRequest.js.hbs',
        });
      } else {
        actions.push({
          type: 'modify',
          path: addActionTemplate,
          pattern: /(\/\/ @generator action:type)[^]+(\/\/ @generator action)[^*]/gm,
          templateFile: addAction,
        },
        {
          type: 'modify',
          path: addReducerTemplate,
          pattern: /(\/\/ @generator reducer:type:action)/gm,
          templateFile: 'reducer/addReducer.js.hbs',
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
        if (data.reducerHandle) {
          actions.push({
            type: 'modify',
            path: routeReducerFile,
            pattern: /(\/\/ @generator reducer:type:action)/gm,
            templateFile: 'reducer/addReducerRequest.js.hbs',
          });
        }
      } else {
        actions.push({
          type: 'modify',
          path: routeActionFile,
          pattern: /(\/\/ @generator action:route:type)[^]+(\/\/ @generator action:route)[^*]/gm,
          templateFile: addAction,
        });
        if (data.reducerHandle) {
          actions.push({
            type: 'modify',
            path: routeReducerFile,
            pattern: /(\/\/ @generator reducer:type:action)/gm,
            templateFile: 'reducer/addReducer.js.hbs',
          });
        }
      }
      actions.push({
        type: 'prettify',
        path: `${utils.getPath()}routes/${data.whichRoute}/modules/`,
        options: '--trailing-comma all --print-width 140 --single-quote',
      });
    }

    return actions;
  },
};
