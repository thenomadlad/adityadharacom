const admin = require("firebase-admin");
const { https } = require('firebase-functions');
const { default: next } = require('next');
const config = require('../next.config.js')

// admin.initializeApp();

// set up nextjs serving handler
const isDev = process.env.NODE_ENV !== 'production';
const app = next({
  dev: isDev,
  conf: config,
});
const nextjsHandle = app.getRequestHandler();

// create "server" which handles https functions using a nextjsHandle
const server = https.onRequest((req, res) => {
  console.log("File: ", req.originalUrl);
  return app.prepare().then(() => nextjsHandle(req, res));
});

exports.nextjsServing = { server };