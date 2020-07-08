import nedb from 'nedb';
const db = new nedb({
  filename: './backend/datafile.db',
  autoload: true
});

export function registerNewUser(req, res, next) {
  db.find({ username: req.body.username }, async (err, doc) => {
    if (err !== null) { // db 검색 오류
      console.log("unable to register new user: database failure: " + err);
      res.status(401).json({ type: 'info', message: 'database failure' });
      return;
    }
    else if (doc.length !== 0) { // 이미 존재하는 username
      console.log(`unable to register new user: username "${req.body.username}" already exists.`)
      res.status(401).json({ type: 'info', message: 'user already exists.' });
      return;
    }
    else {
      if (!(req.body.username && req.body.passwordHash && req.body.passwordSalt
        && req.body.email && req.body.name && req.body.phone && req.body.agreedToTermsOfUse
        && req.body.isMarketingAllowed)) {
        console.log("unable to register new user: required values have errors");
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
            console.log("successfully added new user to db: " + insertedUserData.username);
            res.status(200).json({ type: 'info', message: 'register success' });
            return;
          }
        });
      }
    }
  });
}