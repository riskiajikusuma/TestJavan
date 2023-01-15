"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Person_Assets", {
      person_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "People",
          as: "assets",
        },
      },
      asset_id: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Assets",
          as: "people",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Person_Assets");
  },
};
