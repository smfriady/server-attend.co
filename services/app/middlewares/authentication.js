const { Employee } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");

async function authenticationEmployee(req, _res, next) {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) throw { name: "UNAUTHORIZED" };

    const decoded = verifyToken(token, process.env.JWT_SECRET_EMPLOYEE);

    const { id } = decoded;
    const employee = await Employee.findByPk(id);
    console.log(employee);

    if (employee) {
      req.employee = { id: employee.id, role: employee.role_id };
      next();
    } else {
      throw { name: "UNAUTHORIZED" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authenticationEmployee,
};
