#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const git = require('git-rev-sync');
const moment = require('moment');
const { argv } = require('yargs');
const pkg = require('../package.json');
const project = require('../config/project.config');
const globalenv = require('../config/global.vars');

const COMPILE_FOLDER = argv.type === 'build' ? 'build' : 'dist';
const webpackConfig = process.env.NODE_ENV === 'production'
  ? require('../webpack/webpack.prod') : require('../webpack/webpack.compile');
const addCheckMark = require('./helpers/checkmark');

process.stdin.setEncoding('utf8');
process.stdout.write('\n');

process.stdout.write(`Current node environment ${chalk.cyanBright(process.env.NODE_ENV || 'development')} \n`);
addCheckMark.bind(null, process.stdout.write(`Set Current deploy environment
${chalk.magenta(process.env.NODE_ENV)} \n`));

webpackConfig.plugins.push(new webpack.DefinePlugin(globalenv));

const pkgName = pkg.name.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s|\-/g, '');
const configureBanner = () => `/*!\n* @project ${pkgName} \n* @version V ${pkg.version}\n
* @author ${pkg.author}\n* @build ${moment().format('llll')} ET\n
* @release ${git.long()} [branch ${git.branch()} ]\n
* @copyright Copyright (c) ${moment().format('YYYY')} ${pkg.author} *\n*/`;

const webpackCompiler = (config) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => { // eslint-disable-line consistent-return
      if (err) {
        console.log('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }
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
    fse.copySync(`${process.cwd()}/app/robot.txt`, `./${COMPILE_FOLDER}/robot.txt`);
    fse.copySync(`${process.cwd()}/app/.htaccess`, `./${COMPILE_FOLDER}/.htaccess`);
    fse.copySync(`${process.cwd()}/fonts`, `./${COMPILE_FOLDER}/fonts`);
    fse.copySync(`${process.cwd()}/images`, `./${COMPILE_FOLDER}/images`);
    addCheckMark.bind(null, console.log(chalk.green('Copying static assets to compiled folder.')));
  })
    .then(() => {
      fs.writeFileSync(`./${COMPILE_FOLDER}/version.txt`, configureBanner());
      exec(`yarn archive`,
        addCheckMark.bind(null, console.log(chalk.green('Create zip file for deployment.'))));
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

compile();
