'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'testing review 1',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'testing review 2',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'testing review 3',
        stars: 3
      },
      {
        spotId: 4,
        userId: 4,
        review: 'testing review 4',
        stars: 2
      },
      {
        spotId: 5,
        userId: 5,
        review: 'testing review 5',
        stars: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
