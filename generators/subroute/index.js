const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');

/**
 * Subroute Generator
 */

module.exports = {
  description: 'Add a single subRoute for project',
  prompts: [
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
    },
    {
      type: 'input',
      name: 'subrouteName',
      message: 'What\'s the name of the subRoute?',
      validate: (value, answers) => {
        if (/^[^a-zA-Z]+$/.test(value)) {
          return logger.warn('The name can use only letter.');
        }
        if (/.+/.test(value)) {
          return utils.checkExist(`routes/${answers.whichRoute}/components/${utils.pascalize(value)}`)
            ? logger.warn('That subRoute already exists.') : true;
        }
        return logger.warn('The name is required.');
      },
    },
    {
      name: 'options',
      type: 'checkbox',
      message: 'What do you want to include as extra?',
      default: ['intl'],
      choices: [{
        name: 'History access',
        value: 'history',
      },
      {
        name: 'A language intl file',
        value: 'intl',
      },
      ],
    },
  ],
  actions: (data) => {
    data.uname = utils.getAuthor();
    data.since = utils.getDate();
    const regex = new RegExp(`(path: '\/${data.whichRoute.toLowerCase()}',\\n\\s{0,})(exact: true)[^]`, 'gmi');
    const actions = [
      logger.log(`Starting subroute creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding subroute'),
      (data) => {
        logger.success('[SUBROUTE CREATED WITH SUCEESS]');
        logger.info(data);
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/{{properCase subrouteName}}.jsx`, /* eslint-disable-line */
        templateFile: './subroute/templates/component.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/{{properCase subrouteName}}Container.js`, /* eslint-disable-line */
        templateFile: './subroute/templates/container.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: `${utils.getPath()}routes/${data.whichRoute}/RootComponent.jsx`,
        pattern: /(\/\/ @generator route:import)[^]+({\/\* @generator route:subroute \*\/})[^*]/gm,
        templateFile: './subroute/templates/subroute.jsx.hbs',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/tests/{{properCase subrouteName}}.test.js`,
        templateFile: './subroute/templates/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: regex,
        template: '$1exact: false,',
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/style.js`,
        templateFile: `./subroute/templates/styles.cssjs.hbs`,
        abortOnFail: true,
        skipIfExists: true,
      }];
      // If they want handling text

    if (data.options.includes('intl')) {
      actions.push({
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/languageModule.jsx`,
        templateFile: './subroute/templates/language.jsx.hbs',
        abortOnFail: true,
        skipIfExists: true,
      });
    }
    actions.push({
      type: 'prettify',
      path: `/routes/`,
      options: '--trailing-comma all --print-width 120 --single-quote',
    });
    actions.push({
      type: 'prettify-file',
      path: `/routes/${data.whichRoute}/RootComponent.jsx`,
      options: '--trailing-comma all --print-width 120 --single-quote',
    });

    return actions;
  },
};
