"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Salary.belongsTo(models.Employee, { foreignKey: "employeeId" });
    }
  }
  Salary.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNull: {
            msg: "amount is required",
          },
          notNull: {
            msg: "amount is required",
          },
        },
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isNull: {
            msg: "payment date is required",
          },
          notNull: {
            msg: "payment is required",
          },
        },
      },
      periodeSalary: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isNull: {
            msg: "periode salary is required",
          },
          notNull: {
            msg: "periode salary is required",
          },
        },
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      employeeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Salary",
    }
  );
  return Salary;
};
