"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasOne(models.Employee, {
        foreignKey: "employee_id",
      });
      Profile.hasOne(models.Role, {
        foreignKey: "role_id",
      });
      Profile.hasOne(models.Department, {
        foreignKey: "department_id",
      });
    }
  }
  Profile.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "first name is required" },
          notNull: { msg: "first name  is required" },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "last name is required" },
          notNull: { msg: "last name  is required" },
        },
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "nik already registered" },
        validate: {
          notEmpty: { msg: "nik employee is required" },
          notNull: { msg: "nik employee is required" },
        },
      },
      birth_date: DataTypes.STRING,
      education: DataTypes.STRING,
      img_profile: DataTypes.STRING,

      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Role",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Employee",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Department",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
