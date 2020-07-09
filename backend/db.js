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
        && String(req.body.isMarketingAllowed))) {
        console.log("registerNewUser: unable to register new user, required values have errors");
        if (!req.body.username) console.log("req.body.username  has error -> " + req.body.username);
        if (!req.body.passwordHash) console.log("req.body.passwordHash  has error -> " + req.body.passwordHash);
        if (!req.body.passwordSalt) console.log("req.body.passwordSalt  has error -> " + req.body.passwordSalt);
        if (!req.body.email) console.log("req.body.email  has error -> " + req.body.email);
        if (!req.body.name) console.log("req.body.name  has error -> " + req.body.name);
        if (!req.body.phone) console.log("req.body.phone  has error -> " + req.body.phone);
        if (!req.body.agreedToTermsOfUse) console.log("req.body.agreedToTermsOfUse  has error -> " + req.body.agreedToTermsOfUse);
        if (!String(req.body.isMarketingAllowed)) console.log("req.body.isMarketingAllowed has error -> " + req.body.isMarketingAllowed);
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
            console.log("error => " + err);
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
  console.log("matchesUserCredentialsinDatabase initiated.");
  return new Promise((resolve, reject) => {
    db.find({ "username": username }, async (err, doc) => {
      if (err !== null) { // db 검색 오류
        reject();
        console.log("matchesUserCredentialsinDatabase: unable to authenticate new user: database failure: " + err);
      } else if (doc.length === 0) {
        reject();
        console.log(`matchesUserCredentialsinDatabase: unable to authenticate user: username "${username}" doesn't exist.`);
      } else if (doc[0].passwordHash !== passwordHash) {
        reject();
        console.log(`matchesUserCredentialsinDatabase: unable to authenticate user: username "${username}" password doesn't match.`);
      } else {
        console.log(`matchesUserCredentialsinDatabase: successfully authenticated "${username}" in db, with passwordHash "${doc[0].passwordHash}"`)
        resolve({ "username": username, "valid": true });
      }
    });
  }).catch(error => console.log("matchesUserCredentialsinDatabase: caught promise error -> " + error));
}