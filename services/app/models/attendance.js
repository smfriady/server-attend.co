"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init(
    {
      check_in_time: DataTypes.DATE,
      check_out_time: DataTypes.DATE,
      attendance_type: DataTypes.ENUM,
      attachment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "attachment is required",
          },
          notEmpty: {
            msg: "attachment is required",
          },
        },
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      profile_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
