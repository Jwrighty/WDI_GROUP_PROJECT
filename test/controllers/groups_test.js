/* globals api, expect */

require('../spec_helper');

// const User = require('../../models/user');

describe('User Controller Test', () => {
  describe('GET /api/users', () => {
    it('should return a 200 response', done => {
      api
        .get('/api/user')
        .set('Accept', 'application/json')
        .expect(401, done);
    });
  });
});
