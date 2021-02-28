const { join } = require('path');
const { https } = require('firebase-functions');
const { default: next } = require('next');

const nextjsDistDir = join("..", require('../next.config.js').distDir);

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir
  },
});

const nextjsHandle = server.getRequestHandler();

exports.nextjsServing = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});