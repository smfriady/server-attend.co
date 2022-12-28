const bcryptjs = require("bcryptjs");

const hashPassword = (password) => bcryptjs.hashSync(password);

const comparePassword = (password, hassPass) =>
  bcryptjs.compareSync(password, hassPass);

module.exports = { hashPassword, comparePassword };
