const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function addProdMiddlewares(app) {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(express.static(path.resolve(process.cwd(), 'build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(path.resolve(process.cwd(), 'build'), 'index.html')));
};
