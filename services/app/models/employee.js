"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bycrypt");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Department, { foreignKey: "departmentId" });
      Employee.belongsTo(models.Role, { foreignKey: "roleId" });
      Employee.hasMany(models.Attendance, { foreignKey: "employeeId" });
      Employee.hasMany(models.Salary, { foreignKey: "employeeId" });
    }
  }
  Employee.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "first name is required" },
          notNull: { msg: "first name is required" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "last name is required" },
          notNull: { msg: "last name is required" },
        },
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "nik is required" },
          notNull: { msg: "nik is required" },
        },
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "education is required" },
          notNull: { msg: "education is required" },
        },
      },
      imgProfile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "image profile is required" },
          notNull: { msg: "image profile is required" },
        },
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "birth date is required" },
          notNull: { msg: "birth date is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "email is required" },
          notNull: { msg: "email is required" },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password is required" },
          notNull: { msg: "password is required" },
          len: { args: [6], msg: "password min 6 characters" },
        },
      },
      baseSalary: DataTypes.INTEGER,
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Departments",
          key: "id",
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, _) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
