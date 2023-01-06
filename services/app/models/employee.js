"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../middlewares/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasOne(models.Profile, {
        foreignKey: "profile_id",
      });
    }
  }
  Employee.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email address already registered" },
        validate: {
          notEmpty: { msg: "email is required" },
          notNull: { msg: "email is required" },
          isEmail: { msg: "invalid format email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password is required" },
          notNull: { msg: "password is required" },
          len: { args: [6], msg: "password minimum 6 chars" },
        },
      },
    },
    {
      hooks: {
        beforeValidate: (instance, _) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
