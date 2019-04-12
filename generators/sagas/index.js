const utils = require('../utils/fileUtils');

/**
 * Saga Generator
 */

module.exports = {
  description: 'Add an extra saga for a route or a global one.',
  prompts: [{
    type: 'list',
    name: 'whichSaga',
    message: 'Is it a global saga or a saga for a route? (If you have no routes, global is the only choosable)',
    choices: () => (utils.getDirectoryContent('routes').length > 1 ? ['Global saga', 'Route saga'] : ['Global saga']),
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
    when: answers => answers.whichSaga === 'Route saga',
  },
  {
    type: 'list',
    name: 'isSagaNew',
    message: 'Do you want to create a new saga file or add a saga to an already existing file? (If you have no sagas, new is the only choosable)',
    choices: () => (utils.readDir(`${utils.getPath()}store/sagas/`).length > 1 ? ['New saga file', 'Add a saga'] : ['New saga file']),
    when: answers => answers.whichSaga === 'Global saga',
  },
  {
    type: 'list',
    name: 'whichSagaFile',
    message: 'Which sagas file do you want to extend?',
    choices: () => {
      const mychoiches = utils.readDir(`${utils.getPath()}store/sagas`);
      const list = [];
      mychoiches.forEach((m) => {
        if (!/index/.test(m)) {
          list.push(m);
        }
      });
      return list;
    },
    when: answers => answers.isSagaNew === 'Add a saga',
  },
  {
    type: 'input',
    name: 'sagaNameNew',
    message: 'What should the saga file be called?',
    validate: (value) => {
      if (/.+/.test(value)) {
        return utils.checkExist(`store/sagas/${utils.camelize(value)}.js`) ? 'That saga file already exists.' : true;
      }
      return 'The name is required.';
    },
    when: answers => answers.isSagaNew === 'New saga file',
  },
  {
    type: 'input',
    name: 'sagaName',
    message: 'What\'s the name of the saga?',
    validate: (value, answers) => {
      if (/.+/.test(value) && answers.isSagaNew === 'Add a saga') {
        return utils.checkString(`store/sagas/${answers.whichSagaFile}`, new RegExp(`function\\* ${utils.camelize(value)}\\(`, 'g')) ? 'That method already exists.' : true;
      }
      if (/.+/.test(value) && answers.whichSaga === 'Route saga') {
        return utils.checkString(`routes/${answers.whichRoute}/modules/${answers.whichRoute}Sagas.js`, new RegExp(`function\\* ${utils.camelize(value)}\\(`, 'g')) ? 'That method already exists.' : true;
      }
      return 'The name is required.';
    },
    when: answers => answers.isSagaNew === 'Add a saga' || answers.whichSaga === 'Route saga',
  },
  ],
  actions: (data) => {
    const addSaga = 'sagas/templates/addSaga.js.hbs';
    const addSagaFork = 'sagas/templates/addSagaFork.js.hbs';
    const addSagaTemplate = `${utils.getPath()}store/sagas/${data.whichSagaFile}`;
    const importSagaTemplate = 'sagas/templates/importSaga.js.hbs';
    const importSaga = `${utils.getPath()}store/sagas/index.js`;
    const routeSagaFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Sagas.js`;

    const actions = [];
    if (data.isSagaNew === 'New saga file') {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/sagas/${data.sagaNameNew}.js`,
        templateFile: 'sagas/templates/sagas.js.hbs',
        skipIfExists: true,
      });
      actions.push({
        type: 'modify',
        path: importSaga,
        pattern: /(\/\/ @generator sagas:import)[^]+(\/\/ @generator sagas:export)[^*]/gm,
        templateFile: importSagaTemplate,
      });
    }
    if (data.isSagaNew === 'Add a saga') {
      actions.push({
        type: 'modify',
        path: addSagaTemplate,
        pattern: /(\/\/ @generator saga)[^]+(\/\/ @generator saga:watch)[^*]/gm,
        templateFile: addSaga,
      });
      actions.push({
        type: 'modify',
        path: addSagaTemplate,
        pattern: /(\/\/ @generator saga:fork)[^]/gm,
        templateFile: addSagaFork,
      });
      actions.push({
        type: 'prettify-file',
        path: `store/actions/${data.whichSagaFile}`,
        options: '--trailing-comma all --print-width 120 --single-quote',
      });
    }
    if (data.whichSaga === 'Route saga') {
      actions.push({
        type: 'modify',
        path: routeSagaFile,
        pattern: /(\/\/ @generator saga)[^]+(\/\/ @generator saga:watch)[^*]/gm,
        templateFile: addSaga,
      });
      actions.push({
        type: 'modify',
        path: routeSagaFile,
        pattern: /(\/\/ @generator saga:fork)[^]/gm,
        templateFile: addSagaFork,
      });
      actions.push({
        type: 'prettify-file',
        path: `routes/${data.whichRoute}/modules/${data.whichRoute}Sagas.js`,
        options: '--trailing-comma all --print-width 120 --single-quote',
      });
    }

    return actions;
  },
};
