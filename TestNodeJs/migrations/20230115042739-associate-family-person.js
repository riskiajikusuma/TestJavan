"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("People", "family_id", {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: "Families",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("People", "family_id");
  },
};
