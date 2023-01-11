const { Salary, Employee } = require("../models/index");

const getSalaries = async (req, res, next) => {
  try {
    let { id: employeeId } = req.employee;
    const option = {
      attributes: { exclude: ["createdAt"] },
      order: [["id", "DESC"]],
      where: {
        employeeId: employeeId,
      },
    };
    const Salaries = await Salary.findAll(option);
    res.json(Salaries);
  } catch (err) {
    next(err);
  }
};

const getSalariesWeb = async (req, res, next) => {
  try {
    const option = {
      attributes: { exclude: ["createdAt"] },
      order: [["id", "DESC"]],
      include: {
        model: Employee,
      },
    };
    const Salaries = await Salary.findAll(option);
    res.json(Salaries);
  } catch (err) {
    next(err);
  }
};

module.exports = { getSalaries, getSalariesWeb };
