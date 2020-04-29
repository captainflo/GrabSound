const Authentication = require('../controllers/authentication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: true });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Signup by Email with JWT
  app.post('/signup', Authentication.signup);
  // Signin by Email with JWT
  app.post('/signin', requireSignin, Authentication.signin);
  // Fetch by id with JWT
  app.get('/api/user/:id', Authentication.fetchUser);
  // Edit by id with JWT
  app.post('/api/user/:id', Authentication.editUser);
  // delete by id with JWT
  app.delete('/api/user/:id', Authentication.deleteUser);

  // Google Auth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  // Logout user
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Current User
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
