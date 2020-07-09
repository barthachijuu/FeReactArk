/* eslint consistent-return:0 import/order:0 */
const open = require('open');
const { argv } = require('yargs');
const logger = require('./utils/logger');
const chalk = require('chalk');
const express = require('express');
const project = require('../config/project.config');
require('./utils/check-version')();
const ngrok = (process.env.NODE_ENV === 'development' && process.env.ENABLE_TUNNEL) ? require('ngrok') : false;
const setup = require('./middlewares/commonMiddleware');

// get the intended host and port number, use localhost and port 4200 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const port = parseInt(argv.port || process.env.PORT || (process.env.NODE_ENV === 'development'
  ? project.devServerConfig.port : project.prodServerConfig.port), 10);

const app = express();
setup(app);

console.log(chalk.bgGreen(chalk.black('###   Starting server...   ###')));

// use the gzipped bundle
app.get('*.js*', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect({ port });
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, '', url);
  } else {
    logger.appStarted(port, 'localhost');
  }
  open(`http://localhost:${port}`);
  return true;
});
