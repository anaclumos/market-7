import crypto from "crypto";

function generateRandomString(len) {
  return crypto.randomBytes(len).toString('base64')
}