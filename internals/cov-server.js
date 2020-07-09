#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const open = require('open');

const logger = require('../server/utils/logger');

const server = http.createServer((req, res) => {
  const filePath = `.${req.url}`;

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

server.listen(9002, 'localhost', () => {
  open('http://localhost:9002/coverage/lcov-report/index.html');
  logger.appStarted(9002, 'localhost', `You can view the code coverage here:`);
});
