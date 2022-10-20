'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-01',
        endDate: '2023-01-02'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-02-01',
        endDate: '2023-02-02'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-03-01',
        endDate: '2023-03-02'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2023-04-01',
        endDate: '2023-04-02'
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2023-05-01',
        endDate: '2023-05-02'
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      userId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
