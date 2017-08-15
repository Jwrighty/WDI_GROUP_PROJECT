/* globals api, expect */

require('../spec_helper');
const request = require('supertest');

const Group = require('../../models/group');
const User = require('../../models/user');
const app = require('../../index');

describe('User API:', function() {
  var user;

  // Clear users before testing
  beforeEach(function(done) {
    User.remove(function() {
      user = new User({
        name: 'Fake User',
        username: 'bear',
        email: 'bear@bear.com',
        password: 'password',
        passwordConfirmation: 'password'
      });

      user.save(function(err) {
        if (err) return done(err);
        done();
      });
    });
  });

  // Clear users after testing
  afterEach(function() {
    return User.remove().exec();
  });

  describe('GET /api/users', function() {
    var token;

    beforeEach(function(done) {
      request(app)
      .post('/users/login')
      .send({
        email: 'bear@bear.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
      .get('/api/users')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        // res.body._id.should.equal(user._id.toString());
        done();
      });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
      .get('/api/users/me')
      .expect(401)
      .end(done);
    });
  });
});



describe('Group tests', () => {

  beforeEach(done => {

    Group.collection.remove();
    done();
  });

  afterEach(done => {
    Group.collection.remove();
    done();
  });

  describe('GET /api/groups', () => {

    beforeEach(done => {
      Group.create({
        title: 'Steves Stag',
        image: 'http://fillmurray,com/200/200',
        dates: 10
      })
      .then(() => done())
      .catch(done);
    });

    it('should return a 200 response', done => {
      api
      .get('/api/groups')
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('should respond with a JSON object', done => {
      api
      .get('/api/groups')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.header['content-type'])
        .to.be.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return an array of groups', done => {
      api
      .get('/api/groups')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
    });

    it('should return an array of group objects', done => {
      api.get('/api/groups')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body)
        .and.be.an('array')
        .and.have.property(0)
        .and.have.all.keys([
          '__v',
          '_id',
          'title',
          'image',
          'dates'
        ]);
        done();
      });
    });

    it('group objects should have properities: _id, title, image, dates', done => {
      api.get('/api/groups')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const firstGroup = res.body[0];

        expect(firstGroup)
        .to.have.property('_id')
        .and.to.be.a('string');

        expect(firstGroup)
        .to.have.property('title')
        .and.to.be.a('string');

        expect(firstGroup)
        .to.have.property('image')
        .and.to.be.a('string');

        expect(firstGroup)
        .to.have.property('dates')
        .and.to.be.a('number');

        done();
      });
    });

    describe('Make more than one group', () => {

      beforeEach(done => {
        Group.create([
          {
            title: 'Daves Stag',
            image: 'http://fillmurray,com/200/200',
            dates: 100
          },
          {
            title: 'Sallys Hen',
            image: 'http://fillmurray,com/200/200',
            dates: 1000
          }
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return three groups', done => {
        api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.length).to.equal(3);
          done();
        });
      });
    });
  });

//
//
//   describe('POST /api/groups', () => {
//
//     it('should return a 201 response', done => {
//       api
//       .post('/api/groups')
//       .set('Accept', 'application/json')
//       .send({
//         shoe: {
//           title: 'Steves Stag',
//           image: 'http://fillmurray,com/200/200',
//           dates: 100000
//         }
//       })
//       .expect(201, done);
//     });
//
//     it('should create a shoe', done => {
//       api
//       .post('/api/groups')
//       .set('Accept', 'application/json')
//       .send({
//         shoe: {
//           title: 'Steves Stag',
//           image: 'http://fillmurray,com/200/200',
//           dates: 100
//         }
//       })
//       .end((err, res) => {
//         const shoe = res.body;
//
//         expect(shoe)
//         .to.have.property('_id')
//         .and.to.be.a('string');
//
//         expect(shoe)
//         .to.have.property('title')
//         .and.to.be.a('string');
//
//         expect(shoe)
//         .to.have.property('image')
//         .and.to.be.a('string');
//
//         expect(shoe)
//         .to.have.property('dates')
//         .and.to.be.a('boolean');
//
//         done();
//       });
//     });
//
//   });
//
//   describe('GET /api/groups/:id', () => {
//
//     let group;
//
//     beforeEach(done => {
//       Group.create({
//         title: 'Steves Stag',
//         image: 'http://fillmurray,com/200/200',
//         dates: 100000
//       })
//       .then(groupData => {
//         group = groupData;
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should return a 200 response', done => {
//       api
//       .get(`/api/groups/${group.id}`)
//       .set('Accept', 'application/json')
//       .expect(200, done);
//     });
//   });
//
//   describe('DELETE /api/groups/:id', () => {
//
//     let group;
//
//     beforeEach(done => {
//       Group.create({
//         title: 'Steves Stag',
//         image: 'http://fillmurray,com/200/200',
//         dates: 100
//       })
//       .then(groupData => {
//         group = groupData;
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should return a 204 response', done => {
//       api
//       .delete(`/api/groups/${group.id}`)
//       .set('Accept', 'application/json')
//       .expect(204, done);
//     });
//   });
});
