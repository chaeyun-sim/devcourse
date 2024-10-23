const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export function ensureAuthorization(req) {
  try {
    const receivedJwt = req.headers['authorization'];
    const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_TOKEN_KEY);
    return decodedJwt;
  } catch (err) {
    return err;
  }
}
