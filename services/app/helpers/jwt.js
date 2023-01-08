const jwt = require("jsonwebtoken");

const signJwt = (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { signJwt, verifyToken };
