import passport from 'passport';
import passportLocal from 'passport-local';
import { matchesUserCredentialsinDatabase } from './db'

let LocalStrategy = passportLocal.Strategy;

export function authenticateUser(req, res, next) {
  passport.authenticate('login', async (err, user) => {
    if (err) {
      console.log("authenticateUser: unexpected err -> " + err);
      next(err);
    }
    if (!user) {
      console.log("authenticateUser: unexpected user info -> " + user);
      return res.status(401).redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("authenticateUser: req.logIn failure -> " + err);
        res.status(401).send(user);
        return next(err);
      } else {
        console.log("authenticateUser: successfully logged in.");
        res.status(200).send(user);
      }
    });
  })(req, res, next);
}

passport.use('login', new LocalStrategy(async function(username, password, done) {
  return done(null, await matchesUserCredentialsinDatabase(username, password));
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.status(401).json({ "type": "info", "message": "user is not authenticated" });
}

export { passport };