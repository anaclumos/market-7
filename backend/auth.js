import passport from 'passport';
import passportLocal from 'passport-local';
import { matchesUserCredentialsinDatabase } from './db'

let LocalStrategy = passportLocal.Strategy;

export function authenticateUser(req, res, next) {
  passport.authenticate('login', async (err, user) => {
    if (err) {
      console.log("authenticateUser: unexpected err -> " + err);
      res.sendStatus(401);
    }
    if (!user) {
      console.log("authenticateUser: unexpected user info -> " + user);
      res.sendStatus(401);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("authenticateUser: req.logIn failure -> " + err);
        res.sendStatus(401);
      } else {
        console.log("authenticateUser: successfully logged in.");
        res.sendStatus(200);
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