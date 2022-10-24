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
        lng: "-77.69",
        lat: "37.39",
        name: 'Ash Lake',
        description: 'Quiet place in a quiet part of town. Older place for sure, but was still very clean and the accomodations are great!',
        price: 340
      },
      {
        ownerId: 2,
        address: '2400 Tomahawk Meadows Dr',
        city: 'Midlothian',
        state: "Virginia",
        country: "United States",
        lng: "64.69",
        lat: "-37.39",
        name: 'Tomahawk Creek',
        description: 'Big house in a beauitful suburb of Virginia. I recommend this location to those with children as there is a lot for them to do around here.',
        price: 500
      },
      {
        ownerId: 3,
        address: '846 Dalmalley Lane',
        city: 'Coppell',
        state: "Texas",
        country: "United States",
        lng: "86.69",
        lat: "-44.39",
        name: "Grandma's House",
        description: 'Little place in the town. A lot of places around to eat which is always a plus.',
        price: 600
      },
      {
        ownerId: 4,
        address: '1301 Crossing Pl',
        city: 'Austin',
        state: "Texas",
        country: "United States",
        lng: "65.69",
        lat: "-38.30",
        name: '',
        description: 'Small room in a pretty busy part of a college town. There will always be something to do for people of all ages! ',
        price: 100
      },
      {
        ownerId: 5,
        address: '6th Street',
        city: 'Austin',
        state: "Texas",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'The Bar',
        description: "Spacious rooms only 10 minutes away from the city's downtown area helps save on transportation and time!",
        price: 30
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      ownerId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
