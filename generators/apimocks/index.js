const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');
/**
 * Api Mock Generator
 */

module.exports = {
  description: 'Add a single mock for the api selected',
  prompts: [
    {
      type: 'rawlist',
      name: 'whichMock',
      message: 'Select the API where the mock were added',
      choices: () => {
        const mychoiches = utils.readDir(`${utils.getPath()}mocks/`);
        const list = [];
        mychoiches.forEach((m) => {
          if (utils.isDirectory(`${utils.getPath()}mocks/${m}`)) {
            list.push(m);
          }
        });
        return list;
      },
    },
    {
      type: 'input',
      name: 'mockName',
      message: 'What\'s the url want to be mocked?',
      validate: (value, answers) => {
        if (/\s/.test(value)) {
          return logger.warn('Blank space are not allowed.');
        }
        if (/.+/.test(value)) {
          return utils.checkString(`mocks/${answers.whichMock}/${answers.whichMock}.js`,
            new RegExp(`'/${value}'`, 'gm')) ? logger.warn('That mock already exists.') : true;
        }
        return logger.warn('The name is required.');
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the method type',
      choices: ['get', 'post', 'put', 'delete'],
      default: 'post',
      when: a => a.mockName !== '',
    },
    {
      type: 'list',
      name: 'status',
      message: 'Select the response status',
      choices: ['200', '201', '204', '301', '400', '401', '404', '500'],
      default: '200',
      when: a => a.mockName !== '',
    },
  ],
  actions: (data) => {
    const actions = [
      logger.log(`Starting mock creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding mock method'),
      (data) => {
        logger.success('[MOCK ADDED WITH SUCEESS]');
        logger.info(data);
      },
      {
        type: 'modify',
        path: `${utils.getPath()}mocks/${data.whichMock}/${data.whichMock}.js`,
        pattern: /(\/\/ @generator mock:method)/gm,
        templateFile: './apimocks/templates/mock.js.hbs',
      },
    ];
    actions.push({
      type: 'prettify',
      path: `/mocks/${data.whichMock}/`,
    });
    return actions;
  },
};
