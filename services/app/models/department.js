"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasMany(models.Employee, { foreignKey: "department_id" });
    }
  }
  Department.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "name is required" },
          notNull: { msg: "name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
