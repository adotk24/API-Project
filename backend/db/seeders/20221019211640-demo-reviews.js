'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Super relaxing and comfortable, perfect getaway location!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Weird view, but overall decent experience.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: "Not the best of amenities, but can't be too upset with the price.",
        stars: 3
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Was obviously not cleaned before we leave and the host has the audacity to charge us a cleaning fee.',
        stars: 2
      },
      {
        spotId: 5,
        userId: 1,
        review: 'I got robbed from the inside of my place in broad day light',
        stars: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
