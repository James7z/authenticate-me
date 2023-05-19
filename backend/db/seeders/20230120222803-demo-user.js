'use strict';
const bcrypt = require("bcryptjs");
const { seedUsers } = require('../../utils/seed')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const users = seedUsers(96);
    const demoUsers = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Real2',
        lastName: 'Demo2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'Real3',
        lastName: 'Demo3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Real4',
        lastName: 'Demo4',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]

    demoUsers.forEach(user => users.push(user))

    return queryInterface.bulkInsert(options, users);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gte]: 0 }
    }, {});
  }
};
