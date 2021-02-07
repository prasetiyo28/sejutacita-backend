const AuthRouter = require('./auth');
const UserRouter = require('./user');
const notFound = require('./404').index;

module.exports = function (app) {
  app.use('/auth', AuthRouter);
  app.use('/user', UserRouter);
  app.use(notFound);
};
