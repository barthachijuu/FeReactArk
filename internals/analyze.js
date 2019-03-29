#!/usr/bin/env node

const shelljs = require('shelljs');
const argv = require('yargs').parse();
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

// Generate stats.json file with webpack
// Called after webpack has finished generating the stats.json file
function callback() {
  clearInterval(progress);
}
shelljs.exec(
  `webpack --config ./webpack/webpack.monitor.js --profile --json --mode=${argv.mode || 'development'} > monitor/stats.json`,
  addCheckMark.bind(null, callback), // Output a checkmark on completion
);
