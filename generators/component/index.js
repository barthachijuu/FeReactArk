const utils = require('../utils/fileUtils');
const logger = require('../../server/utils/logger');

/**
 * Component Generator
 */


module.exports = {
  description: 'Add a component to the app',
  prompts: [
    {
      type: 'list',
      name: 'componentType',
      message: 'Which type of component do you prefer?',
      choices: ['Functional', 'Classes'],
    },
    {
      type: 'input',
      name: 'componentName',
      message: 'What is the name of the component?',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return utils.checkExist(`components/${utils.pascalize(value)}`)
            ? logger.warn('That component already exists.') : true;
        }
        return logger.warn('The name is required.');
      },
    },
    {
      type: 'confirm',
      name: 'hasMemo',
      message: `Do you want the component use the momoized functionality?`,
      default: false,
      when: answers => answers.componentType === 'Functional',
    },
    {
      name: 'options',
      type: 'checkbox',
      message: 'What do you want to include?',
      default: ['container'],
      choices: [{
        name: 'Component Container',
        value: 'container',
      },
      {
        name: 'Component PropTypes',
        value: 'props',
      },
      {
        name: 'Component Language Module',
        value: 'lang',
      },
      ],
    },
  ],
  actions: (data) => {
    data.uname = utils.getAuthor();
    data.since = utils.getDate();
    const actions = [
      logger.log(`Starting component creation process`),
      logger.delayLog('Collect all answers'),
      logger.delayLog('Configure all templates'),
      logger.delayLog('Converting hbs template'),
      logger.delayLog('Adding component'),
      (data) => {
        logger.success('[COMPONENT CREATED WITH SUCEESS]');
        logger.info(data);
      },
      {
        type: 'add',
        path: '../app/components/{{properCase componentName}}/{{properCase componentName}}.jsx',
        templateFile: './component/templates/component.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../app/components/{{properCase componentName}}/index.js',
        templateFile: './component/templates/index.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}components/{{properCase componentName}}/tests/{{properCase componentName}}.test.js`,
        templateFile: './component/templates/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../app/components/{{properCase componentName}}/styles.js`,
        templateFile: `./component/templates/styles.cssjs.hbs`,
        abortOnFail: true,
        skipIfExists: true,
      }];

    // If container is included

    if (data.options.includes('container')) {
      actions.push({
        type: 'add',
        path: '../app/components/{{properCase componentName}}/{{properCase componentName}}Container.js',
        templateFile: './component/templates/container.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      });
    }

    // If handling text is included

    if (data.options.includes('lang')) {
      actions.push({
        type: 'add',
        path: '../app/components/{{properCase componentName}}/languageModule.jsx',
        templateFile: './component/templates/language.jsx.hbs',
        abortOnFail: true,
        skipIfExists: true,
      });
    }

    // Add a README.md for every component

    actions.push({
      type: 'add',
      path: '../app/components/{{properCase componentName}}/{{properCase componentName}}.md',
      templateFile: './component/templates/README.md.hbs',
      abortOnFail: true,
      skipIfExists: true,
    });

    return actions;
  },
};
