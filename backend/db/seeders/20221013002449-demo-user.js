'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Andrew',
        lastName: 'Kim',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Esther',
        lastName: 'Kim',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Myong",
        lastName: "Kim",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Ian',
        lastName: 'Kinsler',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Adrian',
        lastName: 'Beltre',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tablename = 'Users'
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: [
          'Demo-lition',
          'FakeUser1',
          'FakeUser2',
          'FakeUser3',
          'FakeUser4'
        ]
      }
    });
  }
};
