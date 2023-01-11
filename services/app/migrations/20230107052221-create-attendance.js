"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Attendances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      checkInTime: {
        type: Sequelize.DATE,
      },
      checkOutTime: {
        type: Sequelize.DATE,
      },
      attendanceType: {
        type: Sequelize.ENUM,
        values: ["absent", "attendance", "sick", "paid leave", "permit"],
        allowNull: false,
        defaultValue: "absent",
      },
      attachment: {
        type: Sequelize.STRING,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Attendances");
  },
};
