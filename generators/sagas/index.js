const utils = require('../utils/fileUtils');

/**
 * Action Generator
 */

module.exports = {
  description: 'Add an extra saga for a route or a global one.',
  prompts: [
    {
      type: 'list',
      name: 'whichSaga',
      message: 'Is it a global saga or a saga for a route?',
      choices: () => ['Global saga', 'Route saga'],
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
      message: 'Do you want to create a new sagas file or add a saga to an already existing file?',
      choices: () => ['New saga file', 'Add a saga'],
      when: answers => answers.whichSaga === 'Global saga',
    },
    {
      type: 'list',
      name: 'whichSagaFile',
      message: 'Which sagas file do you want to extend?',
      choices: () => utils.readDir(`${utils.getPath()}store/sagas/`),
      when: answers => answers.isSagaNew === 'Add a saga',
    },
    {
      type: 'list',
      name: 'sagaNameNew',
      message: 'For which action file do you want to create a saga?',
      choices: () => {
        const mychoiches = utils.readDir(`${utils.getPath()}store/actions`);
        const list = [];
        mychoiches.forEach((m) => {
          if (`${utils.getPath()}store/actions/${m}`) {
            list.push(m);
          }
        });
        return list;
      },
      when: answers => answers.isSagaNew === 'New saga file',
    },
    {
      type: 'input',
      name: 'sagaName',
      message: 'What\'s the name of the saga?',
      validate: (value, answers) => {
        if (/.+/.test(value) && answers.isSagaNew === 'Add a saga') {
          return utils.checkString(`store/sagas/${answers.whichSagaFile}`, new RegExp(utils.camelize(value), 'gm')) || 'That method already exists.';
        }
        if (/.+/.test(value) && answers.whichSaga === 'Route saga') {
          return utils.checkString(`routes/${answers.whichRoute}/modules/${answers.whichRoute}Sagas.js`, new RegExp(utils.camelize(value), 'gm')) || 'That method already exists.';
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
    const routeSagaFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Sagas.js`;

    const actions = [];
    if (data.isSagaNew === 'New saga file') {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/sagas/${data.sagaNameNew}`,
        templateFile: 'action/templates/sagas.js.hbs',
        skipIfExists: true,
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
