'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/875ea373-9fa5-4632-9228-0bb8aa3efa88.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/8ef7a4b0-79b0-439c-9da0-4a170ad4090d.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/07c2691a-7a40-4740-bf9b-6e821b52547b.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-721386515699207701/original/c81d0a7d-54bf-412f-bc1e-969a69fa09b8.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-716489971524221921/original/9c440b57-1ce9-4b57-977e-25df5600bdb3.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715990626223541790/original/694ee517-4dd7-4ace-92d6-c96ec635bdf0.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-734596846818164578/original/4cebb10d-c7f2-4add-9c74-58d74f683431.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715401606875304002/original/f720bb71-9bd0-42d2-abc1-9ff2817fb18a.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-728091517814307485/original/c50089d5-c449-439a-8f19-46e959bf883a.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714028222625357260/original/3337352b-891f-4fae-a1fb-76965fc2bc49.jpeg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-750147911122891249/original/a754a20d-406b-432c-87bb-b3d61f22c0e0.jpeg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-739863408028433088/original/16f11779-8d06-4eef-a893-1676e53fb8bd.jpeg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-710719347181825830/original/266c5b80-9b2d-48ec-8962-ec9288c27ec1.jpeg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-719511952691427887/original/7f4279d2-5484-4148-9265-83099651c3c4.jpeg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-719551181197137816/original/8caadc39-bc21-4071-acaa-02a1391fd99e.jpeg',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-716678031078809652/original/afe98822-1733-4b93-85b6-5ebd2818df08.jpeg',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-733963185137452410/original/200fee62-3517-4835-ba7f-169bc359e690.jpeg',
        preview: true
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {

      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
        ]
      }
    })
  }
};
