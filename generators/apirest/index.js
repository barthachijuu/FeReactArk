const utils = require('../utils/fileUtils');
/**
 * Api Generator
 */

module.exports = {
  description: 'Add a single method for the api selected',
  prompts: [
    {
      type: 'list',
      name: 'whichApi',
      message: 'On which API want to add a method?',
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
          return utils.checkString(`api/${answers.whichApi}/${answers.whichApi}.js`, new RegExp(utils.camelize(value), 'gm')) || 'That method already exists.';
        }
        return 'The name is required.';
      },
    },
    {
      type: 'input',
      name: 'url',
      message: 'What\'s the url of the method (if you know it)',
      filter: (input) => {
        if (input !== undefined) {
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
      when: a => a.url !== '',
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'modify',
        path: `${utils.getPath()}api/${data.whichApi}/${data.whichApi}.js`,
        pattern: /(\/\/ @generator api:method)/gm,
        templateFile: './apirest/templates/api.js.hbs',
      },
    ];
    actions.push({
      type: 'prettify',
      path: `/api/${data.whichApi}/`,
    });
    return actions;
  },
};
