/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: err => console.error(chalk.red(err)),
  fail: fail => console.log(chalk.hex('#f44336').bold(fail)),
  info: info => console.log(chalk.cyan(`DATA => ${JSON.stringify(info, null, '  ')}`)),
  log: log => chalk.blueBright(log),
  message: message => console.log(chalk.hex('#2196f3').underline(message)),
  success: success => console.log(chalk.hex('#4caf50')(success)),
  warn: warn => console.log(chalk.hex('#ff9800').italic(warn)),
  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, message = '', tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`);
    console.log(`${chalk.green(message)}`);
    console.log(`
      ${chalk.bold('Access URLs:')}${divider}
      Localhost: ${chalk.magenta(`http://${host}:${port}`)}
            LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)
          + (tunnelStarted ? `\n    Tunnel: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
  delayLog: msg => () => new Promise((resolve) => {
    setTimeout(() => resolve(msg), 1200);
  }),
};

module.exports = logger;
