const express = require('express');
const router = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const groups          = require('../controllers/groups');
const destinations    = require('../controllers/destinations');
const comments  = require('../controllers/comments');


// Authentications
router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

// Users
router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// Groups
router.route('/groups')
  .get(groups.index)
  .post(groups.create);
router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .delete(groups.delete);
router.route('/groups/:id/attending')
  .get(groups.attending);
router.route('/groups/:id/removeattending')
  .get(groups.notAttending);

// Destinations
router.route('/groups/:id/destinations/new')
  .post(destinations.create);
router.route('/groups/:groupId/destinations/:destinationId')
  .delete(destinations.delete);

// Comments
router.route('/groups/:id/comments')
  .post(comments.create);
// router.route('/groups/:groupId/comments/:commentId')
//   .delete(comments.delete);



module.exports = router;
