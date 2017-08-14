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
    image: 'bear',
    email: 'bear@bear.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Group
    .create([{
      title: 'bear party',
      image: 'bear',
      dates: '191919',
      createdBy: users[0]._id
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
