const jwt = require("jsonwebtoken");

const createToken = (payload) => jwt.sign(payload, process.env.SECRET);

const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

module.exports = { createToken, verifyToken };
