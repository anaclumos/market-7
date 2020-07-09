import nedb from 'nedb';
const db = new nedb({
  filename: './backend/datafile.db',
  autoload: true
});

export function registerNewUser(req, res, next) {
  db.find({ username: req.body.username }, async (err, doc) => {
    if (err !== null) { // db 검색 오류
      console.log(`registerNewUser: unable to register new user, database failure -> ${err}`);
      res.status(401).json({ type: 'info', message: 'database failure' });
      return;
    }
    else if (doc.length !== 0) { // 이미 존재하는 username
      console.log(`registerNewUser: unable to register new user, username "${req.body.username}" already exists.`)
      res.status(401).json({ type: 'info', message: 'user already exists.' });
      return;
    }
    else {
      if (!(req.body.username && req.body.passwordHash && req.body.passwordSalt
        && req.body.email && req.body.name && req.body.phone && req.body.agreedToTermsOfUse
        && req.body.isMarketingAllowed)) {
        console.log("registerNewUser: unable to register new user, required values have errors");
        res.status(401).json({ type: 'info', message: 'required values have errors' });
      }
      else {
        db.insert({
          "username": req.body.username,
          "passwordHash": req.body.passwordHash,
          "passwordSalt": req.body.passwordSalt,
          "email": req.body.email,
          "name": req.body.name,
          "phone": req.body.phone,
          "postalCode": req.body.postalCode,
          "postalAddress": req.body.postalAddress,
          "postalAddressDetails": req.body.postalAddressDetails,
          "agreedToTermsOfUse": req.body.agreedToTermsOfUse,
          "isMarketingAllowed": req.body.isMarketingAllowed,
        }, (err, insertedUserData) => {
          if (err !== null) {
            console.log(err);
            return;
          }
          else {
            console.log("registerNewUser: successfully added new user to db: " + insertedUserData.username);
            res.status(200).json({ type: 'info', message: 'register success' });
            return;
          }
        });
      }
    }
  });
}

export function getDatabaseSalt(req, res, next) {
  db.find({ username: req.body.username }, async (err, doc) => {
    if (err !== null) { // db 검색 오류
      console.log("getDatabaseSalt: unable to register new user: database failure: " + err);
      res.status(401).json({ type: 'info', message: 'database failure' });
      return;
    }
    if (doc.length === 0) {
      console.log(`getDatabaseSalt: unable to get database salt: username "${req.body.username}" doesn't exist.`)
      res.status(401).json({ type: 'info', message: 'user does not exist.' });
      return;
    }
    console.log(`getDatabaseSalt: successfully found username "${req.body.username}" in db, returning salt "${doc[0].passwordSalt}"`)
    res.status(200).json({ "username": req.body.username, "passwordSalt": doc[0].passwordSalt });
    return;
  });
}

export async function matchesUserCredentialsinDatabase(username, passwordHash) {
  let userInfo = null;
  db.find({ "username": username }, async (err, doc) => {
    if (err !== null) { // db 검색 오류
      console.log("matchesUserCredentialsinDatabase: unable to authenticate new user: database failure: " + err);
    } else if (doc.length === 0) {
      console.log(`matchesUserCredentialsinDatabase: unable to authenticate user: username "${username}" doesn't exist.`)
    } else if (doc[0].passwordHash !== passwordHash) {
      console.log(`matchesUserCredentialsinDatabase: unable to authenticate user: username "${username}" password doesn't match.`)
    } else {
      console.log(`matchesUserCredentialsinDatabase: successfully authenticated "${username}" in db, with passwordHash "${doc[0].passwordHash}"`)
      userInfo = { "username": username, "valid": true };
    }
    console.log("userInfo is " + userInfo);
    return userInfo;
  });
}