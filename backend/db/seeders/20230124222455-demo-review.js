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
        spotId: 1,
        userId: 2,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 2
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Lorem ipsum dolor sit amet, fabulas corpora ei qui, quo melius periculis gloriatur ei, vide audiam constituam vim te. Duo integre vocibus te. Dolor tamquam quo et, at eirmod erroribus eum. Ad minim iudico mei. Epicuri eleifend conceptam at per.',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null);
  }
};
