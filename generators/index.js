/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const utils = require('./utils/fileUtils');

const bootstrapGenerator = require('./bootstrap/index.js');
const apiGenerator = require('./apirest/index.js');
const actionGenerator = require('./action/index.js');
const componentGenerator = require('./component/index.js');
const mockGenerator = require('./apimocks/index.js');
const routeGenerator = require('./route/index.js');
const subRouteGenerator = require('./subroute/index.js');
const sagaGenerator = require('./sagas/index.js');

console.clear();

module.exports = (plop) => {
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
        path.join(__dirname, `../web/src/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });

  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '../web/src/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.js*',
    )}`;
    exec(`yarn run prettify -- ${config.options || ''} "${folderPath}"`);
    setTimeout(() => {
      console.clear();
    }, 2000);
    return folderPath;
  });

  plop.setActionType('prettify-file', (answers, config) => {
    const filePath = `${path.join(
      __dirname,
      '../web/src/',
      config.path,
      plop.getHelper('properCase')(answers.name),
    )}`;
    exec(`yarn run prettify -- ${config.options || ''} "${filePath}"`);
    return filePath;
  });

  plop.addHelper('removeBlank', text => text.replace(/\s/g, '').toLowerCase());
  plop.setHelper('if_eq', (a, b, opts) => {
    if (a === b) {
      return opts.fn(this);
    }
    return false;
  });

  plop.setActionType('defaultlang', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '../web/src/',
      config.path,
    )}`;
    config.lang.forEach((l) => {
      fs.writeFile(`${folderPath}${l}.json`, '{}', 'utf8', () => {});
    });
    return 'create succesfull';
  });
};
