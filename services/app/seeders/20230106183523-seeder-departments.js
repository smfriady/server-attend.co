"use strict";

const dataDepartment = require("../data/department.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const department = dataDepartment.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Departments", department, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Departments", null, {});
  },
};
