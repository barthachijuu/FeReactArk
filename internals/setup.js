#!/usr/bin/env node

const { exec, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const readline = require('readline');
const semver = require('semver');
const argv = require('yargs').parse();

const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const os = process.platform;
const temp = process.cwd().replace(process.cwd().split('\\')[process.cwd().split('\\').length - 1], '');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;

/**
 * Deletes a file in the current directory
 */
function deleteFileInCurrentDir(file, callback) {
  fs.unlink(path.join(__dirname, file), callback);
}

/**
 * Function which ends setup process
 */
function endProcess() {
  deleteFileInCurrentDir('setup.js', () => {
    process.stdout.write('\nRemove setup script');
    addCheckMark.bind(null);
    clearInterval(interval);
    process.stdout.write('\n\nNecessary dependencies installed and bootstrapping process complete.');
    process.stdout.write(`\n Before start, please navigate to the new project directory "${argv.project}", and remember to add your repo on your remote origin.`);
    process.stdout.write('\nNow you can run "yarn start", to start your project.');
    process.stdout.write('\nEnjoy your code!');
    process.exit();
  });
}

/**
 * Initializes git again
 */
function initGit(callback) {
  if (/linux|darwin/.test(os)) {
    fs.rename(path.join(__dirname, '../'), path.join(__dirname, '../', '../', argv.project), (err) => {
      if (err) throw err;
      exec(
        'git init && git add . && git commit -m "Initialize project"',
        addCheckMark.bind(null, callback),
      );
    });
  } else {
    fse.copy(process.cwd(), `${temp}${argv.project}`, (err) => {
      if (err) throw err;
      execFile('winzozz.bat', [temp, argv.project], () => {
        process.stdout.write('\nRemove setup script');
        process.stdout.write('\n\nNecessary dependencies installed and bootstrapping process complete.');
        process.stdout.write('\nNow you can run "yarn start", to start your project.');
        process.stdout.write('\nThe system detect yo\'re a windows user. Please change manually your cwd, and start your project!');
        process.exit(0);
      });
    });
  }
}

/**
 * Function which indicates that we are not cleaning git repo
 */
function dontClearRepo(nl, callback) {
  process.stdout.write(`${nl}Leaving your repo folder untouched`);
  addCheckMark(callback);
}

/**
 * Deletes the .git folder in dir only if cloned from our repo
 */
function cleanRepo() {
  clearInterval(interval);
  fs.readFile('.git/config', 'utf8', (err, data) => {
    if (!err) {
      const isClonedRepo = typeof JSON.stringify(data) === 'string' && (JSON.stringify(data).match(/url\s*=/g) || []).length === 1 && /barthachijuu\/FeReactArk.git/.test(JSON.stringify(data));
      if (isClonedRepo) {
        process.stdout.write('\nRemoving old repository');
        fse.remove('.git/', () => {
          initGit(() => {
            endProcess();
          });
        });
      } else {
        dontClearRepo('\n', endProcess);
      }
    } else {
      endProcess();
    }
  });
}


/**
 * Callback function after installing all dependencies
 */
function createScaffolding() {
  clearInterval(interval);
  process.stdout.write('\nCreating scaffolding...');
  setTimeout(() => {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Creating scaffolding');
  }, 800);
  exec(`node node_modules/plop/src/plop.js --plopfile generators/index.js bootstrap ${argv.project}`, addCheckMark.bind(null, cleanRepo));
}

/**
 * Callback function after installing first dependencies
 */
function installDepsCallback(error) {
  clearInterval(interval);
  process.stdout.write('\n\n');
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(0);
  } else {
    process.stdout.write('\nInstalling dependencies... (This might take a while)');
    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('Installing dependencies');
    }, 500);
    exec('yarn install', addCheckMark.bind(null, createScaffolding));
  }
}

/**
 * Installs dependencies
 */
function installDeps() {
  exec('yarn --version', (err, stdout) => {
    const yarnVersion = stdout.trim();
    if (!semver.satisfies(yarnVersion, '>1.1.x')) {
      installDepsCallback(
        `[ERROR] You need Yarn v1.1 or above but you have ${yarnVersion}`,
      );
    } else {
      exec('npm --version', (err2, stdout2) => {
        const npmVersion = stdout2.trim();
        if (!semver.satisfies(npmVersion, '>5.0.0')) {
          installDepsCallback(
            `[ERROR] You need npm v5 or above but you have v${npmVersion}`,
          );
        } else {
          console.clear();
          process.stdout.write('\nInstalling setup dependencies... (This is necessary for start a full installation)');
          setTimeout(() => {
            readline.cursorTo(process.stdout, 0);
            interval = animateProgress('Installing setup dependencies');
          }, 500);
          exec('yarn install', addCheckMark.bind(null, createScaffolding));
        }
      });
    }
  });
}
if (argv.project !== undefined) {
  console.clear();
  if (!/-/.test(argv.project)) {
    process.stdout.write('You may insert the project name (in dash case)\n');
    process.stdin.on('data', (data) => {
      if (!/-/.test(data)) {
        process.stdout.write('Please insert the project name (in dash case)\n');
      } else {
        argv.project = data;
        installDeps();
      }
    });
  } else {
    installDeps();
  }
} else {
  console.clear();
  process.stdout.write('You may start the setup process with the project parameters.\ni.e yarn setup --project react-fe (only in dash case)\n');
  process.exit();
}
