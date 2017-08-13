const User   = require('../models/user');

function authenticationsRegister(req, res){
  User.create(req.body, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user
    });
  });
}

function authenticationsLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    return res.status(200).json({
      message: 'Welcome back.',
      user
    });
  });
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
