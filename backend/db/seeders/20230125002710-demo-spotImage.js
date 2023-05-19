'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { seedSpotImages } = require('../../utils/seed.js');

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    const spotImages = seedSpotImages(100);

    await queryInterface.bulkInsert(options, spotImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gte]: 0 }
    });
  }
};
