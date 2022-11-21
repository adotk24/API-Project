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
        description: 'Hout Bay (Afrikaans: Houtbaai, meaning Wood bay) is exceptionally beautiful and boasts a beautiful white- sand beach where locals walk their dogs, where youll find a bustling marina and a harbour.',
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
        ownerId: 1,
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
        ownerId: 1,
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
        ownerId: 1,
        address: '1601 Wow Way',
        city: 'Grass Valley',
        state: "California",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Scenic A-Frame retreat',
        description: "Tucked in the foothills of the quaint historic mining town of Grass Valley, CA this funky and spacious chalet invites you to experience the great outdoors with family, friends and pets.",
        price: 30
      },
      {
        ownerId: 1,
        address: '123 Somewhere Norway',
        city: 'Rollag kommune',
        state: "Vivken",
        country: "Norway",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Stor laftet hytte med høy standard og flott utsikt',
        description: "Hytta er av nyere dato og har en gjennomgående høy standard med fantastisk beliggenhet på 900 meters høyde.",
        price: 588
      },
      {
        ownerId: 2,
        address: '1157 Yogurt St',
        city: 'Rodia',
        state: "Athens",
        country: "Greece",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Villa Omikron',
        description: "TMany significant words in the greek language start with the letter Omikron (O)",
        price: 672
      },
      {
        ownerId: 2,
        address: '2121 Bartolomeo Boulevard',
        city: 'Malibu',
        state: "California",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Iconic Airstream x Pottery Barn Edition',
        description: "TThe Airstream is nestled on a private property and is conveniently located near the Santa Monica Backbone Trail.",
        price: 350
      },
      {
        ownerId: 2,
        address: '1611 Boat Dock',
        city: 'Fort Pierce',
        state: "Florida",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: '9000 SF Waterfront Mansion',
        description: "Feel like a VIP with our dedicated concierge who is always on call to help you with any extra services or reservations you may need such as a yacht, night club, restaurants, etc.",
        price: 280
      },
      {
        ownerId: 2,
        address: '8342 Louis Lane',
        city: 'Saint-Ferréol',
        state: "Quebec",
        country: "Canada",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Initial',
        description: "Les soeurs, c'est deux imposants chalet en bois , lumineux et convivial, positionné l'un à côté de l'autre. La soeur No1, c'est un chalet de 3 chambres, offrant de l'espace pour 8 personnes sur 2 étages.",
        price: 155
      },
      {
        ownerId: 2,
        address: '632 Joanee Street',
        city: 'Joshua Tree',
        state: "California",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: '3-Story Container Home',
        description: "TWelcome to SkyBox. A fusion of multiple shipping containers has created this one-of-a-kind property in the vast Mojave desert.",
        price: 261
      },
      {
        ownerId: 2,
        address: '825 Michelle Courtyard',
        city: 'Smiths Beach',
        state: "Victoria",
        country: "Australia",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Country Meets Ocean',
        description: "Welcome to the 'Family Escape' at Marlin Beachfront...a holiday destination that once experienced, will never be forgotten.",
        price: 385
      },
      {
        ownerId: 2,
        address: '845 Barn Boulevard',
        city: 'Austerlitz',
        state: "New York",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Renovated 4 BR 3 BA Barn',
        description: "Discover the best of the Berkshires and Hudson Valley at the Barn at Bald Mountain! ",
        price: 375
      },
      {
        ownerId: 2,
        address: '844 Red Cottage',
        city: 'Callicoon Center',
        state: "New York",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Lilac Hill',
        description: "Lilac Hill is a stunning escape in the heart of the Catskills, located just 2 hours from NYC.",
        price: 289
      },
      {
        ownerId: 2,
        address: '211 Ravi Road',
        city: 'Lafayette',
        state: "Louisiana",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Carriage House',
        description: "Nestled in the shady oaks of Sterling Grove Historic District in Lafayette, our quaint Carriage House suite is tucked behind the main home. ",
        price: 139
      },
      {
        ownerId: 2,
        address: '5332 Ryans Road',
        city: 'Borrego Springs',
        state: "California",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Casa Sombrero',
        description: "Welcome to Casa Sombrero, a little slice of desert paradise. ",
        price: 237
      },
      {
        ownerId: 2,
        address: '734 Makayla Meadows',
        city: 'Harbor Springs',
        state: "Michigan",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Waterfront Home',
        description: "This modern waterfront residence is 10 minutes from downtown Harbor Springs featuring an open floor plan, high-end finishes, a covered deck facing Lake Michigan and a fireplace.",
        price: 824
      },
      {
        ownerId: 2,
        address: '8444 Natalie Road',
        city: 'Caicos Island',
        state: "Turks & Caicos",
        country: "Islands",
        lng: "-88.69",
        lat: "-51.39",
        name: 'Villa Maris',
        description: "Villa Maris is brand-new villa, recently constructed on the popular and highly desirable Leeward canal quarter on the Turks and Caicos Island of Providenciales. ",
        price: 2016
      },
      {
        ownerId: 2,
        address: '814 Amber Avenue',
        city: 'Fayetteville',
        state: "Arkansas",
        country: "United States",
        lng: "-88.69",
        lat: "-51.39",
        name: 'The Fritz',
        description: "TEnjoy proximity to Downtown Fayetteville, Dickson Street & Razorback Stadium. Fully renovated in 2020 in the heart of the historic district walking distance to Wilson Park. ",
        price: 439
      },


    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      ownerId: {
        [Op.in]: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
        ]
      }
    })
  }
};
