'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'blank',
        preview: true
      },
      {
        spotId: 2,
        url: 'blank2',
        preview: true
      },
      {
        spotId: 3,
        url: 'blank3',
        preview: true
      },
      {
        spotId: 4,
        url: 'blank4',
        preview: true
      },
      {
        spotId: 5,
        url: 'blank5',
        preview: true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {

      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
