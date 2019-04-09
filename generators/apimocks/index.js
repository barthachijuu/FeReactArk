const utils = require('../utils/fileUtils');
/**
 * Api Generator
 */

module.exports = {
  description: 'Add a single mock for the api selected',
  prompts: [
    {
      type: 'list',
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
        if (/.+/.test(value)) {
          return utils.checkString(`mocks/${answers.whichMock}/${answers.whichMock}.js`, new RegExp(`'/${value}'`, 'gm')) ? 'That mock already exists.' : true;
        }
        return 'The name is required.';
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the method type',
      choices: ['get', 'post', 'put', 'delete'],
      when: a => a.mockName !== '',
    },
    {
      type: 'list',
      name: 'status',
      message: 'Select the response status',
      choices: ['200', '201', '204', '500'],
      when: a => a.mockName !== '',
    },
  ],
  actions: (data) => {
    console.log(data.response);
    const actions = [
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
