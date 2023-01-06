const { Employee, Department, Role } = require("../models/index");

const getEmployees = async (_req, res, next) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [Department, Role],
    });

    res.status(200).json({ employees });
  } catch (err) {
    // next(err);
    console.log(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [Department, Role],
      where: { id },
    });

    res.json({ employee });
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
    } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
    });

    res.status(201).json({
      message: `Employee with email ${employee.email} created successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
    } = req.body;

    await Employee.update(
      {
        first_name,
        last_name,
        nik,
        education,
        img_profile,
        birth_date,
        email,
        password,
      },
      { where: { id } }
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employee.destroy({ where: { id } });

    res.json({ message: `Employee with id ${id} is deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
};
