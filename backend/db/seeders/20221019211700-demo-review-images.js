'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [
          1, 2, 3, 4, 5
        ]
      }
    })
  }
};
