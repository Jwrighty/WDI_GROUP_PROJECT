/* globals api, expect */

require('../spec_helper');


const Group = require('../../models/group');
const User = require('../../models/user');
let token;

describe('Group tests', () => {

  beforeEach(done => {

    Group.collection.remove();
    done();
  });

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  describe('Get /api/groups without token', () => {

    it('should return a 401 response', done => {
      api
      .get('/api/groups')
      .set('Accept', 'application/json')
      .expect(401, done);
    });
  });

  describe('GET /api/groups with token', () => {

    beforeEach(done => {
      const user = new User({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password'
      });

      user.save((err, user) => {
        api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'password'
        }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should return a 201 response', done => {
      api
      .post('/api/groups')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'bear party',
        image: 'http://i2.mirror.co.uk/incoming/article4776355.ece/ALTERNATES/s615/PAY-Polar-bear-party.jpg',
        dates: new Date()
      }).expect(201, done);
    });


    
  });



});
