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
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d31f1b18-0174-44f5-9c22-36b130b3ca10.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/eeaacea0-53d6-413f-8e6e-be902573ee1d.jpg?im_w=720',
        preview: true
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/839a2d73-4e97-49e6-a019-a2aace5ae150.jpg?im_w=720',
        preview: false
      },

      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/3b2d59f5-422e-4965-a1ed-cf5c336295fd.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/3e62daf5-e646-48ba-b58b-5c2a6f9f9f19.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/7546de03-11b3-4bb1-be25-2c3ee70f7cfa.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52897231/original/28ce52c9-cac2-47c3-a3f9-096c258b3509.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/f1dabe12-02e3-4f23-90ef-28e8c713002f.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/410b7b80-cac2-4fb2-808e-156468c2252c.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/1b996001-bfa7-4cf3-9a36-010f0ab9188a.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/90577b41-8181-4157-961a-b5d0417e9d80.jpg?im_w=720',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null);
  }
};
