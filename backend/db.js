import nedb from 'nedb';
const db = new nedb({
  filename: './datafile.db',
  autoload: true
});

export function registerNewUser(req, res, next) {
  db.find({ username: req.body.username }, async (err, doc) => {
    if (err !== null) { // db 검색 오류
      console.log(err);
      res.status(401).json({ type: 'info', message: 'failed: user already exists' });
      return;
    }
    else if (doc.length !== 0) { // 이미 존재하는 username
      console.log(`Username ${req.body.username} already exists.`)
      res.status(401).json({ type: 'info', message: 'failed: user already exists' });
      return;
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
          console.log("Successfully added new user to db: " + insertedUserData);
          res.status(200);
          res.json({
            type: 'info',
            message: 'register success'
          });
          return;
        }
      });
    }
  });
}