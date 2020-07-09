const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const logger = require('../../server/utils/logger');
const utils = require('../utils/fileUtils');


/**
 * Saga Generator
 */
module.exports = {
  description: 'Add an extra saga for a route or a global one.',
  prompts: [{
    type: 'list',
    name: 'whichSaga',
    message: `Is it a global saga or a saga for a route?
    ${logger.log(`(If you have no routes, global is the only choosable)`)}`,
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
    message: `Do you want to create a new saga file or add a saga to an already existing file?
    ${logger.log(`(If you have no sagas, new is the only choosable)`)}`,
    choices: () => (utils.readDir(`${utils.getPath()}store/sagas/`).length > 1
      ? ['New saga file', 'Add a saga'] : ['New saga file']),
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
        if (!/index|tests/.test(m)) {
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
      if (/^[^a-zA-Z]+$/.test(value)) {
        return logger.warn('The name can use only letter.');
      }
      if (/.+/.test(value)) {
        return utils.checkExist(`store/sagas/${utils.camelize(value)}.js`)
          ? logger.warn('That saga file already exists.') : true;
      }
      return logger.warn('The name is required.');
    },
    when: answers => answers.isSagaNew === 'New saga file',
  },
  {
    type: 'input',
    name: 'sagaName',
    message: 'What\'s the name of the saga?',
    validate: (value, answers) => {
      console.log(answers);
      if (/.+/.test(value) && answers.isSagaNew === 'Add a saga') {
        return utils.checkString(`store/sagas/${answers.whichSagaFile}`,
          new RegExp(`function\\* ${utils.camelize(value)}\\(`, 'g'))
          ? logger.warn('That method already exists.') : true;
      }
      if (/.+/.test(value) && answers.whichSaga === 'Route saga') {
        return utils.checkString(`routes/${answers.whichRoute}/modules/${answers.whichRoute}Sagas.js`,
          new RegExp(`function\\* ${utils.camelize(value)}\\(`, 'g'))
          ? logger.warn('That method already exists.') : true;
      }
      return logger.warn('The name is required.');
    },
    when: answers => answers.isSagaNew === 'Add a saga' || answers.whichSaga === 'Route saga',
  },
  {
    type: 'confirm',
    name: 'actionWatch',
    message: 'Want to watch an existing action?',
    default: false,
    when: answers => answers.whichSaga === 'Route saga' && answers.sagaName.length > 0,
  },
  {
    type: 'list',
    name: 'whichAction',
    message: 'Which action do you want to watch?',
    choices: (answers) => {
      const lines = fs.readFileSync(path.join(process.cwd(),
      `/app/routes/${answers.whichRoute}/modules/${answers.whichRoute}Actions.js`), 'utf-8').split('\n');
      lines.splice(0, 12);
      const start = lines.findIndex(line => line.indexOf('// @generator action:route:type') > -1);
      lines.splice(start);
      const list = [];
      lines.forEach((a) => {
        list.push(a.split(':')[0].trim());
      });
      return list;
    },
    when: answers => answers.actionWatch,
  },
  ],
  actions: (data) => {
    data.uname = utils.getAuthor();
    data.since = utils.getDate();
    const addSaga = 'sagas/templates/addSaga.js.hbs';
    const addSagaFork = 'sagas/templates/addSagaFork.js.hbs';
    const addSagaTemplate = `${utils.getPath()}store/sagas/${data.whichSagaFile}`;
    const importSagaTemplate = 'sagas/templates/importSaga.js.hbs';
    const importSaga = `${utils.getPath()}store/sagas/index.js`;
    const routeSagaFile = `${utils.getPath()}routes/${data.whichRoute}/modules/${data.whichRoute}Sagas.js`;
    const actions = [
      chalk.blueBright(`Starting creation process`),
      logger.delayLog('Retrieve all inputs'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      (data) => {
        console.log(chalk.green('[SUCEESS]'));
        logger.info(data);
      },
    ];
    if (data.isSagaNew === 'New saga file') {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/sagas/{{camelCase sagaNameNew}}.js`,
        templateFile: 'sagas/templates/sagas.js.hbs',
        skipIfExists: true,
      });
      actions.push({
        type: 'modify',
        path: importSaga,
        pattern: /(\/\/ @generator sagas:import)[^]+(\/\/ @generator sagas:export)[^*]/gm,
        templateFile: importSagaTemplate,
      });
      actions.push({
        type: 'add',
        path: `${utils.getPath()}store/sagas/test/{{camelCase sagaNameNew}}.test.js`,
        templateFile: 'sagas/templates/testsagas.js.hbs',
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
