'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47270985/original/581a461b-a44c-46c2-8844-3c3ec99e8c0f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40433311/original/a442e9cf-0e67-4ea8-a9ee-cd483c859631.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/73de3da2-3580-4d32-bf7a-04f9dc004af9.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/0e2f1d22-5499-4d64-a240-7bd1a53465cc.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48830220/original/45b791ff-2f27-4000-a3cc-24202c688e97.jpeg?im_w=1200',
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
