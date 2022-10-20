'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'testing1'
      },
      {
        reviewId: 2,
        url: 'testing2'
      },
      {
        reviewId: 3,
        url: 'testing3'
      },
      {
        reviewId: 4,
        url: 'testing4'
      },
      {
        reviewId: 5,
        url: 'testing5'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('ReviewImages', {
      reviewId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
