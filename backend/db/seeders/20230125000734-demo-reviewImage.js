'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        reviewId: 1,
        url: 'image 1 url',
        preview: true
      },
      {
        id: 2,
        reviewId: 1,
        url: 'image 2 url',
        preview: false
      },
      {
        id: 3,
        reviewId: 2,
        url: 'image 3 url',
        preview: true
      },
      {
        id: 4,
        reviewId: 3,
        url: 'image 4 url',
        preview: true
      },
      {
        id: 5,
        reviewId: 3,
        url: 'image 5 url',
        preview: false
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5,] }
    }, {});
  }
};
