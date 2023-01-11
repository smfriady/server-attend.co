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
      Attendance.belongsTo(models.Employee, { foreignKey: "employeeId" });
      Attendance.hasOne(models.Location, { foreignKey: "attendanceId" });
    }
  }
  Attendance.init(
    {
      checkInTime: DataTypes.DATE,
      checkOutTime: DataTypes.DATE,
      attendanceType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["absent", "attendance", "sick", "permit"],
        defaultValue: "absent",
        validate: {
          notNull: { msg: "attendance type is required" },
          notEmpty: { msg: "attendance type is required" },
        },
      },

      attachment: {
        type: DataTypes.STRING,
      },
      employeeId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
