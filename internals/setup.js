#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const readline = require('readline');
const semver = require('semver');
const argv = require('yargs').parse();
const chalk = require('chalk');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const addXMark = require('./helpers/xmark');
const pkg = require('../package.json');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval = -1;

const CWD = process.cwd();
console.clear();

/**
 * Check Node version
 * @param {string} minimalNodeVersion
 * @returns {Promise<any>}
 */
function checkNodeVersion(minimalNodeVersion) {
  return new Promise((resolve, reject) => {
    exec('node --version', (err, stdout) => {
      const nodeVersion = stdout.trim();
      if (err) {
        reject(new Error(err));
      } else if (!semver.satisfies(nodeVersion, minimalNodeVersion)) {
        reject(new Error(`You need Node.js ${minimalNodeVersion} or above but you have ${nodeVersion}`));
      }
      resolve('Engine version OK');
    });
  });
}

/**
 * Check Yarn version
 * @param {string} minimalYarnVersion
 * @returns {Promise<any>}
 */
function checkYarnVersion(minimalYarnVersion) {
  return new Promise((resolve, reject) => {
    exec('yarn --version', (err, stdout) => {
      const yarnVersion = stdout.trim();
      if (err) {
        reject(new Error(err));
      } else if (!semver.satisfies(yarnVersion, minimalYarnVersion)) {
        reject(new Error(`You need Yarn ${minimalYarnVersion} or above but you have ${yarnVersion}`));
      }
    });
    resolve('OK');
  });
}

/**
 * Check npm version
 * @param {string} minimalnpmVersion
 * @returns {Promise<any>}
 */
function checkNpmVersion(minimalNpmVersion) {
  return new Promise((resolve, reject) => {
    exec('npm --version', (err, stdout) => {
      const npmVersion = stdout.trim();
      if (err) {
        reject(new Error(err));
      } else if (!semver.satisfies(npmVersion, minimalNpmVersion)) {
        reject(new Error(`You need Yarn ${minimalNpmVersion} or above but you have ${npmVersion}`));
      }
    });
    resolve('Npm version OK');
  });
}

/**
 * Check the project name inserted
 * @returns {Promise<any>}
 */
function checkProjectName() {
  return new Promise((resolve) => {
    if (!/-/.test(argv.project)) {
      process.stdout.write('You may insert the project name (in dash case)\n');
      process.stdin.resume();
      process.stdin.on('data', (data) => {
        if (!/-/.test(data)) {
          process.stdout.write('Please insert the project name (in dash case)\n');
        } else {
          argv.project = data;
          resolve('project name setted');
        }
      });
    }
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
 * Checks if this is a clone repo
 * @returns {Promise<any>}
 */
function checkClonedRepo() {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }
      const isClonedRepo = stdout
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.startsWith('origin'))
        .filter(line => /\/barthachijuu\.git/.test(line))
        .length;
      resolve(!!isClonedRepo);
    });
  });
}

/**
 * Remove the current Git repository
 * @returns {Promise<any>}
 */
function removeGitRepo() {
  return new Promise((resolve, reject) => {
    try {
      fse.removeSync(`.git/`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Checks if this is a cloned repo.
 * If it is, the setup remove the current .git folder
 * and start with a new repository with an initial commit.
 * @returns {Promise<any>}
 */
async function cleanRepo() {
  const isClone = await checkClonedRepo().catch(reason => reportError(reason));
  // Not a clone so do nothing
  if (isClone === false) {
    return false;
  }

  process.stdout.write('\nRemoving current repository');
  await removeGitRepo().catch(reason => reportError(reason));
  addCheckMark();
  return true;
}

/**
 * Installs dependencies
 * @returns {Promise<any>}
 */
function installDeps() {
  return new Promise((resolve, reject) => {
    process.stdout.write('\n(Installing dependencies (This might take a while)');

    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress(`Installing dependencies`);
    }, 500);

    exec('yarn install', (err) => {
      if (err) {
        reject(new Error(err));
      }
      clearInterval(interval);
      addCheckMark();
      resolve('Dependencies installed');
    });
  });
}

/**
 * Callback function after installing all dependencies
 * @returns {Promise<any>}
 */
function createScaffolding() {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nCreating scaffolding');
    clearInterval(interval);
    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('Creating scaffolding');
    }, 500);
    exec(`plop --plopfile generators/index.js bootstrap ${argv.project}`, (err) => {
      if (err) {
        reject(new Error(err));
      }
      clearInterval(interval);
      addCheckMark();
      resolve('Scaffolding created');
    });
  });
}

/**
 * Initializes a new git repo
 * @returns {Promise<any>}
 */
function initGitRepo() {
  return new Promise((resolve, reject) => {
    exec('git init', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Add all files to the new repository
 * @returns {Promise<any>}
 */
function addToGitRepo() {
  return new Promise((resolve, reject) => {
    exec('git add .', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Initial Git commit
 * @returns {Promise<any>}
 */
function commitToGitRepo() {
  return new Promise((resolve, reject) => {
    exec('git commit -m "Initial commit"', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}


/**
 * Deletes a file in the current directory
 * @param {string} file
 * @returns {Promise<any>}
 */
function deleteFileInCurrentDir(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(CWD, file), err => reject(new Error(err)));
    resolve();
  });
}

/**
 * Configure the style
 * @returns {Promise<boolean>}
 */
async function configureStyle() {
  return new Promise((resolve) => {
    fse.copySync(`${path.join(CWD, '/internals/templates/theme.js.hbs')}`,
      `${path.join(CWD, '/app/styles/themes/theme.js')}`);
    process.stdout.write('\nStyle correctly setted');
    addCheckMark();
    resolve(true);
  });
}

/**
 * Edit the package,json with new information project
 * @returns {Promise<boolean>}
 */
function editPackageJson() {
  return new Promise((resolve) => {
    fse.copySync(`${path.join(CWD, '/internals/templates/.htaccess.hbs')}`, `${path.join(CWD, '/app/.htaccess')}`);
    fse.copySync(`${path.join(CWD, '/internals/templates/robot.txt.hbs')}`, `${path.join(CWD, '/app/robot.txt')}`);
    fs.readFile(`${path.join(CWD, '/package.json')}`, 'utf8', (err, data) => {
      const pkg = JSON.parse(data);
      pkg.name = argv.project;
      pkg.version = '1.0.0';
      pkg.description = '';
      delete pkg.scripts.setup;
      fs.writeFileSync(`${path.join(CWD, '/package.json')}`, JSON.stringify(pkg));
      exec(`yarn prettify ${path.join(CWD, '/package.json')}`);
    });
    process.stdout.write('\nInformation changed correctly');
    addCheckMark();
    resolve(true);
  });
}

/**
 * end the setup process
 */
function endProcess() {
  process.stdout.write('\nNow you can run "yarn start", to start your project.');
  process.stdout.write('\nEnjoy your code!');
  process.exit(0);
}

/**
 * Run
 */
(async () => {
  // Take the required engines version from package.json
  const { engines: { node, yarn, npm } } = pkg;
  const requiredNodeVersion = node.match(/([0-9.]+)/g)[0];
  await checkNodeVersion(requiredNodeVersion).catch(reason => reportError(reason));

  const requiredYarnVersion = yarn.match(/([0-9.]+)/g)[0];
  const resp = await checkYarnVersion(requiredYarnVersion).catch(reason => reportError(reason));
  if (typeof resp === 'object') {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(chalk.red(` ${resp}\n`)));
    const requiredNpmVersion = npm.match(/([0-9.]+)/g)[0];
    await checkNpmVersion(requiredNpmVersion).catch(reason => reportError(reason));
  }
  await checkProjectName().catch(reason => reportError(reason));
  await installDeps().catch(reason => reportError(reason));
  await createScaffolding().catch(reason => reportError(reason));

  const isRepoClean = await cleanRepo().catch(reason => reportError(reason));
  await configureStyle();
  await editPackageJson();

  if (isRepoClean) {
    process.stdout.write('\n');
    interval = animateProgress('Initialising new repository');
    process.stdout.write('Initialising new repository');
    await deleteFileInCurrentDir('/internals/setup.js').catch(reason => reportError(reason));

    try {
      await initGitRepo();
      await addToGitRepo();
      await commitToGitRepo();
    } catch (err) {
      reportError(err);
    }
    addCheckMark();
    clearInterval(interval);
  }
  clearInterval(interval);
  await endProcess();
})();
