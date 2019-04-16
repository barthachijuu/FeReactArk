const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const readline = require('readline');
const { exec } = require('child_process');
const utils = require('../generators/utils/fileUtils');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark.js');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;
let count = 0;

/**
 * Function which ends setup process
 */
const endProcess = () => {
  clearInterval(interval);
  process.stdout.write('\Cleanup done. Happy Coding!!!');
  process.exit();
};

const resetSagas = () => {
  let lines = fs.readFileSync(`${path.join(__dirname, '../web/src/store/sagas/index.js')}`, 'utf-8');
  lines = lines.split('\n');
  let start = lines.findIndex(line => line.indexOf('sagas:import') > -1);
  lines.splice(1, (start - 1));
  start = lines.findIndex(line => line.indexOf('sagas:export') > -1);
  lines.splice(start + 1, start - 2);
  fs.writeFileSync(`${path.join(__dirname, '../web/src/store/sagas/index.js')}`, lines.join('\n'));
};

const removeFile = (file = '', dir = '') => {
  if (dir !== '') {
    const files = utils.readDir(`${utils.getPath()}${dir}`);
    files.forEach((m) => {
      if (`${utils.getPath()}${dir}/${m}` && !/index/.test(m)) {
        shell.rm('-rf', `${utils.getPath()}${dir}/${m}`);
      }
    });
  }
  if (file !== '') {
    fs.stat(file, (err) => {
      if (!err) {
        shell.rm('-rf', file);
      }
    });
  }
};

const removeDir = (dir) => {
  dir.forEach((d) => {
    fs.stat(d, (err, info) => {
      if (!err) {
        if (info.isDirectory()) {
          shell.rm('-rf', d);
          count += 1;
        }
      }
    });
  });
  if (count === dir.length || count === 0) {
    process.stdout.write('\nCleanup started...');
    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('Cleanup started');
    }, 500);
    setTimeout(() => {
      addCheckMark.bind(null, clearInterval(interval));
      resetSagas();
      process.stdout.write('\n Insert the container name (in dash case)');
      process.stdin.on('data', (data) => {
        if (!/-/.test(data)) {
          process.stdout.write('\n Please insert the container name (in dash case)');
        } else {
          process.stdout.write('Creating scaffolding...');
          setTimeout(() => {
            readline.cursorTo(process.stdout, 0);
            interval = animateProgress('Creating scaffolding');
          }, 800);
          exec(`node node_modules/plop/src/plop.js --plopfile generators/index.js bootstrap ${data}`, addCheckMark.bind(null, endProcess));
        }
      });
    }, 1800);
  }
};

console.clear();

// Remove existing Scaffolding
removeFile(`${path.join(__dirname, '../web/src/index.jsx')}`);
removeFile(`${path.join(__dirname, '../web/src/store/createStore.js')}`);
removeFile(`${path.join(__dirname, '../web/src/utility/LanguageProvider.jsx')}`);
removeFile(`${path.join(__dirname, '../web/src/utility/ErrorBoundary.jsx')}`);
removeFile(`${path.join(__dirname, '../web/assets/styles/scss/ErrorBoundary.scss')}`);
removeFile('', 'store/actions');
removeFile('', 'store/reducers');
removeFile('', 'store/sagas');
removeFile('', 'translations');
removeDir([`${path.join(__dirname, '../web/src/components')}`,
  `${path.join(__dirname, '../web/src/containers')}`,
  `${path.join(__dirname, '../web/src/routes')}`,
  `${path.join(__dirname, '../web/assets/styles/theme')}`,
  `${path.join(__dirname, '../web/src/api')}`,
  `${path.join(__dirname, '../web/src/mocks')}`,
  `${path.join(__dirname, '../web/src/utility/tests')}`,
  `${path.join(__dirname, '../coverage')}`,
]);
