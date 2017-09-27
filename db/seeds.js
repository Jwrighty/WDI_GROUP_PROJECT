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
  username: 'LizzieLols',
  firstName: 'Lizzie',
  lastName: 'bearton',
  image: 'https://images.pexels.com/photos/157907/smile-color-laugh-black-157907.jpeg?h=350&auto=compress&cs=tinysrgb',
  email: 'lizzie@bearton.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'TomTom',
  firstName: 'Tom',
  lastName: 'Monkey',
  image: 'https://images.pexels.com/photos/447189/pexels-photo-447189.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
  email: 'tom@monkey.com',
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
    image: 'https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2017/12/31),
    createdBy: users[3]._id,
    members: [users[0]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Phil\'s Stag to end all Stags',
    image: 'https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/12/31),
    createdBy: users[2]._id,
    members: [users[0]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Gary\'s Stag',
    image: 'https://images.pexels.com/photos/68775/pexels-photo-68775.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/3/12),
    createdBy: users[2]._id,
    members: [users[1]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Lucy\'s Lavish Hen do',
    image: 'https://images.pexels.com/photos/3192/woman-girl-beauty-mask.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/5/6),
    createdBy: users[1]._id,
    members: [users[1]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Sophie\'s Fantabulous Hen do',
    image: 'https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/3/6),
    createdBy: users[4]._id,
    members: [users[1]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },{
    title: 'Claudia\'s Hen whoop whoop',
    image: 'https://images.pexels.com/photos/58592/pexels-photo-58592.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/3/6),
    createdBy: users[1]._id,
    members: [users[4]._id],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },{
    title: 'Andy\'s Stag - lads, lads, lads',
    image: 'https://images.pexels.com/photos/544988/pexels-photo-544988.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    dates: new Date(2018/5/7),
    createdBy: users[1]._id,
    members: [users[4]._id],
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
