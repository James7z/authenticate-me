'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {

        spotId: 1,
        userId: 2,
        startDate: '2022-1-20',
        endDate: '2022-1-27'
      },
      {

        spotId: 1,
        userId: 3,
        startDate: '2022-5-20',
        endDate: '2022-5-24'
      },
      {

        spotId: 2,
        userId: 1,
        startDate: '2022-7-20',
        endDate: '2022-7-27'
      },
      {

        spotId: 3,
        userId: 1,
        startDate: '2022-8-21',
        endDate: '2022-8-23'
      },
      {

        spotId: 3,
        userId: 2,
        startDate: '2022-10-20',
        endDate: '2022-10-25'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null);
  }
};
