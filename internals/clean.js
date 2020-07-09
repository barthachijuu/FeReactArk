#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const shell = require('shelljs');
const readline = require('readline');
const { exec } = require('child_process');
const chalk = require('chalk');
const utils = require('../generators/utils/fileUtils');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark.js');
const addXMark = require('./helpers/xmark');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval = -1;
let count = 0;

const CWD = process.cwd();
/**
 * Check if the project is already cleaned
 * @returns {Promise<boolean>}
 */
function isProjectCleaned() {
  return new Promise((resolve) => {
    fs.stat(`${path.join(process.cwd(), '/app/index.jsx')}`, (err) => {
      if (!err) {
        resolve(false);
      }
      if (err) {
        process.stdout.write('\nYour project is already clean\n');
        resolve(true);
      }
    });
  });
}

/**
 * Remove the files passaed as arguments
 * @returns {Promise<boolean>}
 */
function removeFile(type = 'files', array) {
  return new Promise((resolve) => {
    const remove = f => fs.stat(`${path.join(process.cwd(), f)}`, (err) => {
      if (!err) {
        shell.rm('-rf', `${path.join(process.cwd(), f)}`);
      }
    });
    if (type === 'dirs') {
      array.forEach((d) => {
        const arrayOfFile = utils.readDir(`${utils.getPath()}${d}`);
        arrayOfFile.forEach((f) => {
          if (`${utils.getPath()}${d}/${f}` && !/index|enhancers|forms/.test(f)) {
            shell.rm('-rf', `${utils.getPath()}${d}/${f}`);
          }
        });
      });
    }
    if (type === 'files') {
      array.forEach((file) => {
        remove(file);
      });
    }
    resolve('OK');
  });
}


/**
 * Remove the directories passaed as arguments
 * @returns {Promise<boolean>}
 */
function removeDir(dir) {
  return new Promise((resolve) => {
    dir.forEach((d) => {
      fs.stat(`${path.join(process.cwd(), d)}`, (err, info) => {
        if (!err) {
          if (info.isDirectory()) {
            shell.rm('-rf', `${path.join(process.cwd(), d)}`);
            count += 1;
          }
        }
      });
    });
    if (count === dir.length || count === 0) {
      resolve('OK');
    }
  });
}

/**
 * Remove the asset files
 * @returns {Promise<boolean>}
 */
function removeAssets(array) {
  return new Promise((resolve) => {
    array.forEach((d) => {
      const arrayOfFile = utils.readDir(`${process.cwd()}/${d}`);
      arrayOfFile.forEach((f) => {
        shell.rm('-rf', `${process.cwd()}${d}/${f}`);
      });
    });
    resolve('OK');
  });
}

/**
 * Reset the backupped files to original
 * @returns {Promise<boolean>}
 */
function resetFiles() {
  return new Promise((resolve) => {
    fs.unlinkSync(`${path.join(CWD, '/app/store/sagas/index.js')}`);
    fs.unlinkSync(`${path.join(CWD, '/app/store/reducers/index.js')}`);
    fs.copyFileSync(`${path.join(CWD, '/internals/templates/sagastemplate.js.hbs')}`,
      `${path.join(CWD, '/app/store/sagas/index.js')}`);
    fs.copyFileSync(`${path.join(CWD, '/internals/templates/reducertemplate.js.hbs')}`,
      `${path.join(CWD, '/app/store/reducers/index.js')}`);
    fse.moveSync(`${path.join(CWD, '/app/store/actions/enhancers.test.js')}`,
      `${path.join(CWD, '/app/store/actions/tests/enhancers.test.js')}`);
    fse.moveSync(`${path.join(CWD, '/app/store/reducers/enhancers.test.js')}`,
      `${path.join(CWD, '/app/store/reducers/tests/enhancers.test.js')}`);
    process.stdout.write('\nProject cleaned');
    clearInterval(interval);
    addCheckMark();
    resolve('OK');
  });
}

/**
 * Check the project name inserted
 * @returns {Promise<any>}
 */
function askIfWantToReinitProject() {
  return new Promise((resolve) => {
    process.stdout.write('\nDo you want to create all the scaffolding [Y/n]?');
    process.stdin.resume();
    process.stdin.on('data', (data) => {
      const answer = data.toString().trim().toLowerCase() || 'y';
      answer === 'y' ? resolve(true) : resolve(false);
    });
  });
}

/**
 * Create all the scaffold for the project
 * @returns {Promise<any>}
 */
function createScaffolding(name) {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nCreating scaffolding');
    clearInterval(interval);
    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('Creating scaffolding');
    }, 500);
    exec(`plop --plopfile generators/index.js bootstrap ${name}`, (err) => {
      if (err) {
        reject(new Error(err));
      }
      clearInterval(interval);
      addCheckMark();
      process.stdout.write('\nNow you can run "yarn start", to start your project.');
      process.stdout.write('\nEnjoy your code!');
      process.exit(0);
    });
  });
}

/**
 * Check the project name inserted
 * @returns {Promise<any>}
 */
function checkProjectName() {
  return new Promise((resolve) => {
    process.stdout.write('\nInsert the container name (in dash case)');
    process.stdin.on('data', (data) => {
      if (!/-/.test(data)) {
        process.stdout.write('\nPlease insert the container name (in dash case)');
      } else {
        createScaffolding(data);
      }
    });
    resolve('project name setted');
  });
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
function reportError(error) {
  clearInterval(interval);

  if (error) {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(chalk.red(` ${error}\n`)));
    process.exit(1);
  }
}

/**
 * Run
 */
(async () => {
  // Reinitilize the entire project
  console.clear();
  // check if is already clean
  const isCleaned = await isProjectCleaned();
  if (!isCleaned) {
    // Backup files
    fse.moveSync(`${path.join(CWD, '/app/store/actions/tests/enhancers.test.js')}`,
      `${path.join(CWD, '/app/store/actions/enhancers.test.js')}`);
    fse.moveSync(`${path.join(CWD, '/app/store/reducers/tests/enhancers.test.js')}`,
      `${path.join(CWD, '/app/store/reducers/enhancers.test.js')}`);

    // Remove existing Scaffolding
    const filesToRemove = [
      '/app/index.jsx',
      '/app/store/createStore.js',
      '/app/utils/LanguageProvider.jsx',
      '/app/utils/ErrorBoundary.jsx',
      '/app/utils/globalMethods.js',
      '/app/login.js',
      '/app/login.html',
    ];
    const dirToRemove = [
      'store/actions',
      'store/sagas',
      'store/reducers',
    ];
    try {
      process.stdout.write('\n');
      interval = animateProgress('Cleanup started');
      process.stdout.write('\nCleanup started');
      await removeFile('files', filesToRemove);
      await removeFile('dirs', dirToRemove);

      await removeDir([
        '/app/components',
        '/app/styles/themes',
        '/app/styles/scss',
        '/app/styles/jss',
        '/app/containers',
        '/app/context',
        '/app/routes',
        '/app/api',
        '/app/mocks',
        '/app/translations',
        '/app/utils/tests',
        '/coverage',
        '/monitor',
      ]);
      await removeAssets(['images', 'svg']);
      await resetFiles();
      clearInterval(interval);
    } catch (err) {
      reportError(err);
    }
  }
  const wantNew = await askIfWantToReinitProject().catch(reason => reportError(reason));
  if (wantNew === true) {
    await checkProjectName().catch(reason => reportError(reason));
    // await endProcess();
  } else {
    process.stdout.write('\nNew project isn\'t set. You cannot start the project.');
    process.stdout.write('\nMake sure you reinitialize the project correctly');
    process.exit(0);
  }
})();
