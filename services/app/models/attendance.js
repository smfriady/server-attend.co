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
      attendance_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["absent", "attendance", "sick", "paid leave", "permit"],
        defaultValue: "absent",
        validate: {
          notNull: { msg: "attendance type is required" },
          notEmpty: { msg: "attendance type is required" },
          isEven(values) {
            // nanti ditambahkan lagi untuk type yang lain
            if (values !== "absent") {
              throw new Error("wrong choose attendance type");
            }
          },
        },
      },
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      profile_id: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeValidate: (value, _opt) => {
          value.attendance_type = "absent";
        },
      },
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
