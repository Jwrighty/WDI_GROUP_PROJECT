const express = require('express');
const router = express.Router();

const authentications = require('../controllers/authentications');
const users = require('../controllers/users');
const groups = require('../controllers/groups');
// const comments  = require('../controllers/comments');
// const destinations = ('../controllers/destinations');


router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/groups')
  .get(groups.index)
  .post(groups.create);


router.route('/groups/:id')
  .get(groups.show)
  // .post(groups.create)
  // .post(comments.create)
  // .put or .post (groups.create or groups.update)
  .put(groups.update)
  .delete(groups.delete);



// router.route('/groups/:groupId/comments/:commentId')
//   .delete(comments.delete);
//
// router.route('/groups/:groupId/destinations/:destinationId')
//   .delete(destinations.delete);


module.exports = router;
