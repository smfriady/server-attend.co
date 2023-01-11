const { Employee } = require("../models/index");

const { signJwt } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bycrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw { name: "NO_EMAIL" };
    if (!password) throw { name: "NO_PASSWORD" };

    const employee = await Employee.findOne({ where: { email } });
    if (!employee) throw { name: "INVALID_CREDENTIAL" };

    const isPassword = comparePassword(password, employee.password);
    if (!isPassword) throw { name: "INVALID_CREDENTIAL" };

    const generate = signJwt(
      { id: employee.id },
      process.env.JWT_SECRET_EMPLOYEE,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ access_token: generate, email: employee.email });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
