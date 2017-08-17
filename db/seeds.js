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
},{
  username: 'steveo',
  firstName: 'Steve',
  lastName: 'Davis',
  image: 'https://images.pexels.com/photos/7823/selfie.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
  email: 'steve@davis.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'sallyxoxo',
  firstName: 'Sally',
  lastName: 'Smithers',
  image: 'https://images.pexels.com/photos/58020/pexels-photo-58020.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  email: 'sally@smithers.com',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return Group
  .create([{
    title: 'Jimmy the Lad\'s Stag',
    image: 'https://static.pexels.com/photos/37862/musician-rockstar-band-music-37862.jpeg',
    dates: new Date(2017/11/11),
    createdBy: users[0]._id,
    members: [users[1]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Harriet\'s Hilarious Hen Do',
    image: 'https://images.pexels.com/photos/160420/photo-booth-wedding-party-girls-160420.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
    dates: new Date(2017/12/31),
    createdBy: users[3]._id,
    members: [users[0]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },{
    title: 'Paul the Don - last night of freedom',
    image: 'https://images.pexels.com/photos/401685/pexels-photo-401685.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
    dates: new Date(2018/6/7),
    createdBy: users[1]._id,
    members: [users[3]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
