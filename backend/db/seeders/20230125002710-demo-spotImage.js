'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        spotId: 1,
        url: 'image 1 url',
        preview: false
      },
      {
        id: 2,
        spotId: 1,
        url: 'image 2 url',
        preview: true
      },
      {
        id: 3,
        spotId: 2,
        url: 'image 3 url',
        preview: true
      },
      {
        id: 4,
        spotId: 2,
        url: 'image 4 url',
        preview: true
      },
      {
        id: 5,
        spotId: 4,
        url: 'image 5 url',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5,] }
    }, {});
  }
};
