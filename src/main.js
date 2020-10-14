"use strict";

const server = require('./server')({
  logger: true
});

const start = async () => {
  try {
    await server.listen('3000', '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
