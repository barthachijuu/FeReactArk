const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');

/**
 * Api Generator
 */

module.exports = {
  description: 'Add a single method for the api selected',
  prompts: [{
    type: 'rawlist',
    name: 'whichApi',
    message: 'On which API want to add a method?',
    pageSize: 10,
    choices: () => {
      const mychoiches = utils.readDir(`${utils.getPath()}api/`);
      const list = [];
      mychoiches.forEach((m) => {
        if (utils.isDirectory(`${utils.getPath()}api/${m}`)) {
          list.push(m);
        }
      });
      return list;
    },
  },
  {
    type: 'input',
    name: 'methodName',
    message: 'What\'s the name of the method?',
    validate: (value, answers) => {
      if (/.+/.test(value)) {
        return !utils.checkString(`api/${answers.whichApi}/${answers.whichApi}.js`,
          new RegExp(`function ${utils.camelize(value)}\\(`, 'gm')) ? true : logger.warn('That method already exists.');
      }
      return logger.warn('The name is required.');
    },
  },
  {
    type: 'input',
    name: 'url',
    message: 'What\'s the url of the method (if you know it)',
    filter: (input) => {
      if (input !== undefined) {
        if (input.substr(-1) === '/' && input.substr(input.length - 1) === '/') {
          input = input.substr(1, (input.length - 2));
        }
        return input.replace(/\s/g, '');
      }
      return '';
    },
    when: a => a.methodName !== '',
  },
  {
    type: 'list',
    name: 'type',
    message: 'Select the method type',
    choices: ['get', 'post', 'put', 'delete'],
    default: 'post',
    when: a => a.url !== '',
  },
  ],
  actions: (data) => {
    const actions = [
      logger.log(`Starting api creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding api method'),
      (data) => {
        logger.success('[METHOD ADDED WITH SUCEESS]');
        logger.info(data);
      }, {
        type: 'modify',
        path: `${utils.getPath()}api/${data.whichApi}/${data.whichApi}.js`,
        pattern: /(\/\/ @generator api:method)/gm,
        templateFile: './apirest/templates/api.js.hbs',
      }];
    actions.push({
      type: 'prettify',
      path: `/api/${data.whichApi}/`,
    });
    return actions;
  },
};
