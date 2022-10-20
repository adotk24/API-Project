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
        name: 'Ash Lake',
        description: 'this is a test description',
        price: 340
      },
      {
        ownerId: 2,
        address: '2400 Tomahawk Meadows Dr',
        city: 'Midlothian',
        state: "Virginia",
        country: "United States",
        longitude: "64.69",
        latitude: "-37.39",
        name: 'Tomahawk Creek',
        description: 'this is a test description -- 2',
        price: 500
      },
      {
        ownerId: 3,
        address: '846 Dalmalley Lane',
        city: 'Coppell',
        state: "Texas",
        country: "United States",
        longitude: "86.69",
        latitude: "-44.39",
        name: "Grandma's House",
        description: 'this is a test description -- 3',
        price: 600
      },
      {
        ownerId: 4,
        address: '1301 Crossing Pl',
        city: 'Austin',
        state: "Texas",
        country: "United States",
        longitude: "65.69",
        latitude: "-38.30",
        name: '',
        description: 'this is a test description -- 4',
        price: 100
      },
      {
        ownerId: 5,
        address: '6th Street',
        city: 'Austin',
        state: "Texas",
        country: "United States",
        longitude: "-88.69",
        latitude: "-51.39",
        name: 'The Bar',
        description: 'this is a test description-- 5',
        price: 30
      },

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
