const { Employee, Department, Role } = require("../models/index");
const DatauriParser = require("datauri/parser");
const Cloudinary = require("../helpers/cloudinary");
const { Op } = require("sequelize");
const e = require("express");

const getEmployees = async (req, res, next) => {
  try {
    const { page = "", firstName = "", filter = "", limit = 5 } = req.query;

    const option = {
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "departmentId",
          "roleId",
        ],
      },
      limit,
      include: [
        {
          model: Department,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "ASC"]],
    };
    if (firstName !== "") {
      option.where = {
        firstName: { [Op.iLike]: `%${firstName}%` },
      };
    }

    if (page !== "") {
      option.offset = Number((page - 1) * limit);
    }

    if (filter !== "") {
      option.include = [
        {
          model: Department,
          where: { id: filter },
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ];
    }

    const employees = await Employee.findAndCountAll(option);

    res
      .status(200)
      .json({ total: employees.count, employees: employees.rows, page: +page });
  } catch (err) {
    next(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    let option = {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Department,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      where: { id },
    };

    const employee = await Employee.findOne(option);
    if (!employee) throw { name: "NO_DATA_FOUND" };

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    if (!req.file) throw { name: "BAD_REQUEST_IMG_PROFILE" };
    const {
      firstName,
      lastName,
      nik,
      education,
      birthDate,
      email,
      password,
      baseSalary,
      departmentId,
      roleId,
    } = req.body;

    const parser = new DatauriParser();
    const pathImage = parser.format(req.file.originalname, req.file.buffer);
    const image = await Cloudinary.upload(pathImage.content);
    const imgProfile = image.secure_url;

    const payload = {
      firstName,
      lastName,
      nik,
      education,
      birthDate,
      email,
      password,
      baseSalary,
      departmentId,
      roleId,
      imgProfile: imgProfile,
    };

    const employee = await Employee.create(payload);
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
      firstName,
      lastName,
      nik,
      education,
      birthDate,
      email,
      baseSalary,
      departmentId,
      roleId,
      imgProfile,
    } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) throw { name: "NO_DATA_FOUND" };

    if (req.file) {
      const parser = new DatauriParser();
      const pathImage = parser.format(req.file.originalname, req.file.buffer);
      const image = await Cloudinary.upload(pathImage.content);
      const imgProfile = image.secure_url;

      const payload = {
        firstName,
        lastName,
        nik,
        education,
        birthDate,
        email,
        baseSalary,
        departmentId,
        roleId,
        imgProfile: imgProfile,
      };

      await Employee.update(payload, { where: { id: employee.id } });

      res.status(200).json({
        message: `Employee with email ${payload.email} updated successfully`,
      });
    } else {
      const payload = {
        firstName,
        lastName,
        nik,
        education,
        birthDate,
        email,
        baseSalary,
        departmentId,
        roleId,
        imgProfile,
      };

      await Employee.update(payload, { where: { id: employee.id } });

      res.status(200).json({
        message: `Employee with email ${payload.email} updated successfully`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) throw { name: "NO_DATA_FOUND" };

    await Employee.destroy({ where: { id } });

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
  createEmployee,
  editEmployee,
  deleteEmployee,
};
