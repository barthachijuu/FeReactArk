#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');
const fs = require('fs');
const open = require('open');

const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const mode = process.env.NODE_ENV;
const progress = animateProgress('Generating stats');

// Generate stats.json file with webpack
// Called after webpack has finished generating the stats.json file
function openAnalyzer() {
  clearInterval(progress);
  open(`http://localhost:9001`);
}

/**
 * Run
 */
(async () => {
  if (!fs.existsSync(`${path.join(process.cwd(), 'monitor')}`)) {
    fs.mkdirSync(`${path.join(process.cwd(), 'monitor')}`);
  }
  shelljs.exec(`webpack --config ${mode === 'development' ? './webpack/webpack.dev.js' : './webpack/webpack.prod.js'}
    --profile --json --mode=${mode} > monitor/stats.json`,
  addCheckMark.bind(null, openAnalyzer)); // Output a checkmark on completion
})();
