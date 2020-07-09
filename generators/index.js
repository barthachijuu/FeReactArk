/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');
const utils = require('./utils/fileUtils');

const bootstrapGenerator = require('./bootstrap/index.js');
const apiGenerator = require('./apirest/index.js');
const actionGenerator = require('./actions/index.js');
const componentGenerator = require('./component/index.js');
const mockGenerator = require('./apimocks/index.js');
const routeGenerator = require('./route/index.js');
const subRouteGenerator = require('./subroute/index.js');
const sagaGenerator = require('./sagas/index.js');

console.clear();

module.exports = (plop) => {
  plop.setWelcomeMessage(chalk.blue('Please choose a generator and remember to choose the correct answer'));
  // controller generator
  plop.setGenerator('bootstrap', bootstrapGenerator);
  if (utils.getDirectoryContent('routes').length !== 0) {
    if (utils.getDirectoryContent('routes').length > 1) {
      plop.setGenerator('api', apiGenerator);
    }
    plop.setGenerator('action', actionGenerator);
    plop.setGenerator('component', componentGenerator);
    if (utils.getDirectoryContent('routes').length > 1) {
      plop.setGenerator('mock', mockGenerator);
    }
    plop.setGenerator('route', routeGenerator);
    plop.setGenerator('saga', sagaGenerator);
    if (utils.getDirectoryContent('routes').length > 1) {
      plop.setGenerator('subroute', subRouteGenerator);
    }
  }


  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(
        path.join(process.cwd(), `/app/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });

  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      process.cwd(),
      '/app/',
      config.path,
      plop.getHelper('properCase')(config.name),
      '**.js*',
    )}`;
    exec(`yarn run prettify -- ${config.options || ''} "${folderPath}"`);
    return folderPath;
  });

  plop.setActionType('prettify-file', (answers, config) => {
    exec(`yarn run prettify -- ${config.options || ''} "${config.path}"`);
    return config.path;
  });

  plop.setActionType('createdir', (answers, config) => {
    const filePath = `${path.join(
      process.cwd(),
      '/app/',
      config.path,
      plop.getHelper('properCase')(answers.routeName),
    )}`;
    exec(`mkdir ${filePath}/jsonmocks`);
  });

  plop.addHelper('removeBlank', text => text.replace(/\s/g, '').toLowerCase());

  plop.addHelper('removeExtension', text => text.split('.')[0].toLowerCase());

  plop.addHelper('curlyBraces', text => `{${plop.getHelper('properCase')(text)}}`);

  /* eslint-disable */
  plop.setHelper('equal', function(lvalue, rvalue, options) {
      if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters")
      if (lvalue != rvalue) {
          return options.inverse(this)
      } else {
          return options.fn(this)
      }
  });

  plop.setHelper('isPresent', function (array, voice, options) {
    if (!array.includes(voice)) {
      return options.inverse(this);
    }
    return options.fn(this);
  });

  plop.setHelper('isNotPresent', function (array, voice, options) {
    return options.fn(this);
  });

  plop.setActionType('defaultlang', (answers, config) => {
    const folderPath = `${path.join(
      process.cwd(),
      '/app/',
      config.path,
      )}`;
      fs.mkdir(`${folderPath}`, { recursive: true }, (err) => {
          if (err) throw err;
          config.lang.forEach((l) => {
            fs.writeFile(`${folderPath}${l}.json`, '{}', err => {if (err) throw err; })
        });
      })
    return 'create succesfull';
  });
};
