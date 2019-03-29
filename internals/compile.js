#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const argv = require('yargs').parse();
const project = require('../config/project.config');
const globalenv = require('../config/global.vars');

// configurations
const env = require(`../config/deployenv/${argv.d || 'development'}`); // eslint-disable-line import/no-dynamic-require

const webpackConfig = require('../webpack/webpack.compile');
const webpackLoginConfig = require('../webpack/webpack.login');
const addCheckMark = require('./helpers/checkmark');

process.stdin.setEncoding('utf8');
process.stdout.write('\n');

process.stdout.write(`Current node environment ${chalk.cyanBright(process.env.NODE_ENV || 'development')} \n`);
addCheckMark.bind(null, process.stdout.write(`Set Current deploy environment ${chalk.magenta(env.DEPLOY_ENV_NAME)} \n`));

exec('yarn clean', addCheckMark.bind(null, console.log(chalk.green('Remove previous version.'))));

webpackConfig.plugins.push(new webpack.DefinePlugin(globalenv));
webpackConfig.plugins.push(new webpack.DefinePlugin(env));
webpackLoginConfig.plugins.push(new webpack.DefinePlugin(globalenv));
webpackLoginConfig.plugins.push(new webpack.DefinePlugin(env));

const webpackCompiler = (config) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => { // eslint-disable-line consistent-return
      if (err) {
        return reject(err);
      }
      console.log('Webpack compiler encountered a fatal error.', err);
      const jsonStats = stats.toJson();
      addCheckMark.bind(null, console.log(chalk.green('Webpack compile completed.')));

      if (jsonStats.errors.length > 0) {
        console.log(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      }
      if (jsonStats.warnings.length > 0) {
        console.log('Webpack compiler encountered warnings.');
        console.log(jsonStats.warnings.join('\n'));
      }
      resolve(jsonStats);
    });
  });
};

const compile = () => {
  console.log(chalk.green('Starting compiler.'));
  return Promise.resolve().then(() => webpackCompiler(webpackConfig)).then((stats) => {
    if (stats.warnings.length && project.compiler_fail_on_warning) {
      throw new Error('Config set to fail on warning, exiting with status code "1".');
    }
    fse.copySync('./public', './dist');
    addCheckMark.bind(null, console.log(chalk.green('Copying static assets to dist folder.')));
  })
    .then(() => {
      console.log('Compilation completed successfully.');
    })
    // LOGIN
    .then(() => webpackCompiler(webpackLoginConfig))
    .then(() => {
      console.log('Login Compilation completed successfully.');
      const mychoiches = fs.readdirSync(`dist`);
      mychoiches.forEach((m) => {
        if (/js|html/.test(m)) {
          fs.readFile(`dist/${m}`, 'utf8', (err, data) => {
            fs.writeFileSync(`dist/${m}`, data.replace(/\/web\/assets/gm, ''));
          });
        }
      });
    })
    // END LOGIN
    .then(() => {
      fse.remove('./dist/styles');
      exec(`yarn archive --d ${argv.d || 'development'}`, addCheckMark.bind(null, console.log(chalk.green('Create zip file for deployment.'))));
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

compile();
