"use strict";

const profileData = require("../data/profiles.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profiles = profileData.map((profile) => {
      profile.createdAt = profile.updatedAt = new Date();
      return profile;
    });

    await queryInterface.bulkInsert("Profiles", profiles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
