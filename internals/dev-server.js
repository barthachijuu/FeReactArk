const server = require('../server/server');
const PROJECT = require('../config/project.config');
const logger = require('../server/utils/logger');

server.listen(PROJECT.dev_server.port, 'localhost', async (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(PROJECT.dev_server.port, 'localhost');
  return true;
});
