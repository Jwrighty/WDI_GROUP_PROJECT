module.exports = {
  port: process.env.PORT || 4000,
  db: {
    production: process.env.MONGODB_URI,
    development: 'mongodb://localhost/project-3',
    test: 'mongodb://localhost/project-3-test'
  },
  secret: process.env.SECRET || 'sssssshutt up'
};
