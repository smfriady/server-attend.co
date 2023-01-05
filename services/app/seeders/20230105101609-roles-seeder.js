"use strict";

const roleData = require("../data/roles.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = roleData.map((role) => {
      role.createdAt = role.updatedAt = new Date();
      return role;
    });
    await queryInterface.bulkInsert("Roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
