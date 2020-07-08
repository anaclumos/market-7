import crypto from "crypto";

var config = {
  hashBytes: 64,
  saltBytes: 64,
  iterations: 872791
};

export function generateRandomSalt() {
  return crypto.randomBytes(config.saltBytes).toString('base64')
}

export async function hash(input, salt) {
  return new Promise((resolve, reject) => {
    try {
      crypto.pbkdf2(input, salt, config.iterations, config.hashBytes, 'sha512', (err, key => {
        if (err) reject(e)
        resolve(key.toString('base64'));
      }));
    } catch (e) {
      console.log("hashWithString err: " + e);
      reject(e);
    }
  });
}

// const passwordSalt = generateRandomSalt();
// const passwordHash = hash(password, passwordSalt);