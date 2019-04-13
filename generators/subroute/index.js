const utils = require('../utils/fileUtils');

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
        if (/.+/.test(value)) {
          return utils.checkExist(`routes/${answers.whichRoute}/components/${utils.pascalize(value)}`) ? 'That subRoute already exists.' : true;
        }
        return 'The name is required.';
      },
    },
    {
      type: 'confirm',
      name: 'hasHistory',
      message: 'Should the component have access to history?',
      default: false,
    },
  ],
  actions: (data) => {
    const regex = new RegExp(`(path: '\/${data.whichRoute.toLowerCase()}',\\n\\s{0,})(exact: true)[^]`, 'gmi');
    const actions = [
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/{{properCase subrouteName}}.jsx`,
        templateFile: './subroute/templates/component.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${utils.getPath()}routes/${data.whichRoute}/components/{{properCase subrouteName}}/{{properCase subrouteName}}Container.js`,
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
        type: 'modify',
        path: `${utils.getPath()}routes/index.jsx`,
        pattern: regex,
        template: '$1exact: false,',
      },
    ];
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
