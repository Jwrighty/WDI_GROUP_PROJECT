const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const Group = require('../models/group');
const User = require('../models/user');
const dbURL      = process.env.MONGODB_URI || 'mongodb://localhost/project-3';
mongoose.connect(dbURL);

User.collection.drop();
Group.collection.drop();

User
.create([{
  username: 'bear',
  firstName: 'bear',
  lastName: 'bear',
  image: 'http://www.wikiality.com/file/2016/11/bears1.jpg',
  email: 'bear@bear.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'monkey',
  firstName: 'monkey',
  lastName: 'monkey',
  image: 'http://2.bp.blogspot.com/-dl_bE1deWOs/UOFq7WKFprI/AAAAAAAAKnY/QHyiPa3oSco/s1600/wallpaper-of-a-drinking-monkey-hd-monkeys-wallpapers.jpg',
  email: 'monkey@monkey.com',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return Group
  .create([{
    title: 'bear party',
    image: 'http://i2.mirror.co.uk/incoming/article4776355.ece/ALTERNATES/s615/PAY-Polar-bear-party.jpg',
    dates: new Date(),
    createdBy: users[0]._id,
    members: [users[1]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'Stag Party',
    image: 'http://bestmansbestman.co.uk/wp-content/uploads/2012/09/6-Winning-Stag-Party-Planning-Tips.jpg',
    dates: new Date(),
    createdBy: users[1]._id,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }]);
})
.then((groups)=>{
  console.log(`${groups.length} groups created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
