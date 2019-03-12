const utils = require('../utils/fileUtils');
/**
 * Component Generator
 */


module.exports = {
  description: 'Add a component to the app',
  prompts: [
    {
      type: 'confirm',
      name: 'componentType',
      message: 'Is it a Stateful Component?',
      default: true,
    },
    {
      type: 'input',
      name: 'componentName',
      message: 'What is the name of the component?',
      default: '',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return utils.checkExist(value) ? 'That component already exists.' : true;
        }
        return 'The name is required.';
      },
    },
    {
      type: 'confirm',
      name: 'containerComponent',
      default: true,
      message: 'Should the component have a container?',
    },
    {
      type: 'confirm',
      name: 'wantSCSSModules',
      default: true,
      message: 'Should the component use SCSS Modules?',
    },
    {
      type: 'confirm',
      name: 'wantPropTypes',
      default: true,
      message: 'Should the component have PropTypes?',
    },
    {
      type: 'confirm',
      name: 'wantIntl',
      message: 'Should the component handle text?',
      default: true,
    },
  ],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: '../web/src/components/{{properCase componentName}}/{{properCase componentName}}.jsx',
      templateFile: './component/templates/component.js.hbs',
      abortOnFail: true,
      skipIfExists: true,
    }];

    actions.push({
      type: 'add',
      path: '../web/src/components/{{properCase componentName}}/index.js',
      templateFile: './component/templates/index.js.hbs',
      abortOnFail: true,
      skipIfExists: true,
    });


    // If they want a container, add componentNameContainer.js

    if (data.containerComponent) {
      actions.push({
        type: 'add',
        path: '../web/src/components/{{properCase componentName}}/{{properCase componentName}}Container.js',
        templateFile: './component/templates/container.js.hbs',
        abortOnFail: true,
        skipIfExists: true,
      });
    }

    // If they want a CSS file, add styles.scss

    if (data.wantSCSSModules) {
      actions.push({
        type: 'add',
        path: '../web/src/components/{{properCase componentName}}/{{properCase componentName}}.scss',
        templateFile: './component/templates/styles.scss.hbs',
        abortOnFail: true,
        skipIfExists: true,
      });
    }

    // Add a README.md for every component

    actions.push({
      type: 'add',
      path: '../web/src/components/{{properCase componentName}}/{{properCase componentName}}.md',
      templateFile: './component/templates/README.md.hbs',
      abortOnFail: true,
      skipIfExists: true,
    });

    return actions;
  },
};
