'use strict';

const server = require('./server')();

describe('Server', function() {
  describe('GET /', function() {
    it('should return hello world!', async function() {
      const response = await server.inject({
        method: 'GET',
        url: '/'
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('hello world!');
    });

    it('should return hello <name>! from query param', async function() {
      const response = await server.inject({
        method: 'GET',
        url: '/',
        query: {
          name: 'Docker'
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('hello Docker!');
    });
  });
});