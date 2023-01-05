const { Employee } = require("../models/index");

const getEmployees = async (req, res, next) => {
  try {
    const options = {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    };

    const employees = await Employee.findAll(options);

    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

module.exports = { getEmployees };
