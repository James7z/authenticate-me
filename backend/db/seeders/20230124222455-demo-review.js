'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        spotId: 1,
        userId: 2,
        review: 'Demo Review This was an awesome spot!',
        stars: 5
      },
      {
        id: 2,
        spotId: 1,
        userId: 3,
        review: 'Demo Review 2 Abcde good',
        stars: 4
      },
      {
        id: 3,
        spotId: 2,
        userId: 1,
        review: 'Demo Review 3 Abcde avg',
        stars: 3
      },
      {
        id: 4,
        spotId: 3,
        userId: 1,
        review: 'Demo Review Abcde 4 bad',
        stars: 2
      },
      {
        id: 5,
        spotId: 3,
        userId: 2,
        review: 'Demo Review Abcde 5 great',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5,] }
    }, {});
  }
};