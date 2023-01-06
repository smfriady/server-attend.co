const { Employee, Profile } = require("../models/index");

const getEmployees = async (_req, res, next) => {
  try {
    // const options = {
    //   attributes: {
    //     exclude: ["password", "createdAt", "updatedAt"],
    //   },
    //   include: {
    //     model: Profile,
    //   },
    // };

    const employees = await Profile.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (isNaN(id)) throw { name: "NOT_FOUND" };

    const options = {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    };

    const employee = await Employee.findByPk(id, options);

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

const insertEmployee = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.create({ email, password });

    res.status(201).json({
      message: `Employee with email ${employee.email} created successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { email, password } = req.body;

    const payload = { email, password };

    await Employee.update(payload, { where: { id } });

    res.status(200).json({
      message: `Employee with email ${payload.email} updated successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const destroyEmployee = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const employee = await Employee.findByPk(id);

    if (!employee) throw { name: "NOT_FOUND" };

    await Employee.destroy({ where: { id: employee.id } });

    res.status(200).json({
      message: `Employee with email ${employee.email} deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  insertEmployee,
  updateEmployee,
  destroyEmployee,
};
