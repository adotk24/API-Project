'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'blank',
        preview: true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
      spotId: {
        [Op.in]: [
          1
        ]
      }
    })
  }
};
