const fastify = require('fastify');

function build(opts = {}) {
  const server = fastify(opts);

  server.get('/', (request) => {
    const name = request.query.user;
    if (name) {
      return `hello ${name}!`;
    }
    return 'hello world!';
  });

  return server;
}

module.exports = build;
