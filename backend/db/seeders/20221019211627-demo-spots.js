'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [

      {
        ownerId: 1,
        address: '15201 Feather Chase Dr',
        city: 'Chesterfield',
        state: "Virginia",
        country: "United States",
        longitude: "-77.69",
        latitude: "37.39",
        name: 'Tomahawk Creek',
        description: 'this is a test description',
        price: 340
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: {
        [Op.in]: [
          1
        ]
      }
    })
  }
};
