"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const assets = await fetch("https://dummyjson.com/products");
    const { products } = await assets.json();
    let result = products[0];

    for (let i = 0; i < products.length; i++) {
      let id = products[i].id;
      let title = products[i].title;
      let price = products[i].price;
      result = { id: id, asset: title, harga: price };

      await queryInterface.bulkInsert("Assets", [
        {
          ...result,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Assets", null, {});
  },
};
