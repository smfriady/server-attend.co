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
      check_in_time: {
        type: Sequelize.DATE,
      },
      check_out_time: {
        type: Sequelize.DATE,
      },
      attendance_type: {
        type: Sequelize.ENUM,
        values: ["absent", "attendance", "sick", "paid leave", "permit"],
        allowNull: false,
        defaultValue: "absent",
      },
      attachment: {
        type: Sequelize.STRING,
      },
      profile_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Profiles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
