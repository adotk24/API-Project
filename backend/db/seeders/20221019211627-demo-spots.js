'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [

      {
        ownerId: 1,
        address: '123 Villa Dr',
        city: 'Cape Town',
        state: "Western Cape",
        country: "South Africa",
        lng: "-77.69",
        lat: "37.39",
        name: 'Hidden Haven',
        description: 'Hout Bay (Afrikaans: Houtbaai, meaning Wood bay) is exceptionally beautiful and boasts a beautiful white- sand beach where locals walk their dogs, where you will find a bustling marina, many art galleries, well known restaurants, and a harbour.',
        price: 559
      },
      {
        ownerId: 1,
        address: '900 Abelha Avenue',
        city: 'Flores de Cunha',
        state: "Rio Grande do Sul",
        country: "Brazil",
        lng: "64.69",
        lat: "-37.39",
        name: 'Chalé Lua Nova',
        description: 'Um chalé isolado em São Gotardo - Flores da Cunha, aconchegante para você aproveitar bons momentos com quem ama.',
        price: 46
      },
      {
        ownerId: 2,
        address: '471 Farming St',
        city: 'Cedar City',
        state: "Utah",
        country: "United States",
        lng: "86.69",
        lat: "-44.39",
        name: "Zion Kolob Canyon",
        description: 'This serene, private guest home on our family ranch is just 9 miles south of Cedar City. Enjoy our friendly farm animals, orchard, and seasonal garden.',
        price: 145
      },
      {
        ownerId: 3,
        address: 'Really High in the Air(bnb)',
        city: 'Broad Cove',
        state: "Nova Scotia",
        country: "Canada",
        lng: "65.69",
        lat: "-38.30",
        name: 'Shackup Tower',
        description: 'Like a Hotel, but with no front desk and everyone gets a private hot tub in the forest!',
        price: 100
      },
      {
        ownerId: 4,
        address: '1601 Wow Way',
        city: 'Grass Valley',
        state: "California",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Scenic A-Frame retreat',
        description: "Tucked in the foothills of the quaint historic mining town of Grass Valley, CA this funky and spacious chalet invites you to experience the great outdoors with family, friends and pets.",
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
