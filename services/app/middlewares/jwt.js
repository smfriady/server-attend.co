const jwt = require("jsonwebtoken");

const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createToken, verifyToken };
