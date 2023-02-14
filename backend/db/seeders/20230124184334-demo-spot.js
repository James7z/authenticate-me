'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {

        ownerId: 1,
        address: '512 Demo Ave',
        city: 'New Smyrna Beach',
        state: 'Florida',
        country: 'United States',
        lat: 29.040691316623363,
        lng: -80.89366493130787,
        name: 'Demo Suites 1',
        description: 'Lorem ipsum dolor sit amet, ei meis malis invenire sed, causae iriure ei duo. Vix feugiat incorrupte no, eos debet persius debitis ea. Wisi quas consequat ea qui. Corpora partiendo no qui. Nam aeque consul facilis te, vitae petentium euripidis eos te. Virtute consequuntur signiferumque ex vis. Ex vix erat fabulas ocurreret, ei iusto consul referrentur est. At vel tation intellegebat, sit aperiri prodesset ea. Ad nullam reprehendunt conclusionemque has, ad quaestio argumentum voluptatibus per. An mea minim causae fastidii, consul labitur quo id, eam nihil nonumes veritus ea. Quo no nulla petentium, alii virtute ceteros et usu, an rebum possit nominati mei. Veri mandamus pertinacia ex eum.',
        price: 223
      },
      {

        ownerId: 1,
        address: '2705 S Demo Ave',
        city: 'Daytona Beach',
        state: 'Florida',
        country: 'United States',
        lat: 29.18532687589032,
        lng: -80.98118845900389,
        name: 'Demo Suites 2',
        description: 'Lorem ipsum dolor sit amet, ei meis malis invenire sed, causae iriure ei duo. Vix feugiat incorrupte no, eos debet persius debitis ea. Wisi quas consequat ea qui. Corpora partiendo no qui. Nam aeque consul facilis te, vitae petentium euripidis eos te. Virtute consequuntur signiferumque ex vis. Ex vix erat fabulas ocurreret, ei iusto consul referrentur est. At vel tation intellegebat, sit aperiri prodesset ea. Ad nullam reprehendunt conclusionemque has, ad quaestio argumentum voluptatibus per. An mea minim causae fastidii, consul labitur quo id, eam nihil nonumes veritus ea. Quo no nulla petentium, alii virtute ceteros et usu, an rebum possit nominati mei. Veri mandamus pertinacia ex eum.',
        price: 357
      },
      {
        ownerId: 2,
        address: '1180 Fake St',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: 30.271205702654612,
        lng: -97.72981723664698,
        name: 'Demo Suites 3',
        description: 'Lorem ipsum dolor sit amet, ei meis malis invenire sed, causae iriure ei duo. Vix feugiat incorrupte no, eos debet persius debitis ea. Wisi quas consequat ea qui. Corpora partiendo no qui. Nam aeque consul facilis te, vitae petentium euripidis eos te. Virtute consequuntur signiferumque ex vis. Ex vix erat fabulas ocurreret, ei iusto consul referrentur est. At vel tation intellegebat, sit aperiri prodesset ea. Ad nullam reprehendunt conclusionemque has, ad quaestio argumentum voluptatibus per. An mea minim causae fastidii, consul labitur quo id, eam nihil nonumes veritus ea. Quo no nulla petentium, alii virtute ceteros et usu, an rebum possit nominati mei. Veri mandamus pertinacia ex eum.',
        price: 258
      },
      {
        ownerId: 2,
        address: '1000 Real St',
        city: 'Springfield',
        state: 'Missouri',
        country: 'United States',
        lat: 32.271205702654612,
        lng: -97.72981723664698,
        name: 'Demo Suites 4',
        description: 'Lorem ipsum dolor sit amet, ei meis malis invenire sed, causae iriure ei duo. Vix feugiat incorrupte no, eos debet persius debitis ea. Wisi quas consequat ea qui. Corpora partiendo no qui. Nam aeque consul facilis te, vitae petentium euripidis eos te. Virtute consequuntur signiferumque ex vis. Ex vix erat fabulas ocurreret, ei iusto consul referrentur est. At vel tation intellegebat, sit aperiri prodesset ea. Ad nullam reprehendunt conclusionemque has, ad quaestio argumentum voluptatibus per. An mea minim causae fastidii, consul labitur quo id, eam nihil nonumes veritus ea. Quo no nulla petentium, alii virtute ceteros et usu, an rebum possit nominati mei. Veri mandamus pertinacia ex eum.',
        price: 350
      },
      {
        ownerId: 3,
        address: '2000 Fake Ave',
        city: 'Puerto Morelos',
        state: 'Quintana Roo',
        country: 'Mexico',
        lat: 32.271205702654612,
        lng: -97.72981723664698,
        name: 'Demo Suites 5',
        description: 'Lorem ipsum dolor sit amet, ei meis malis invenire sed, causae iriure ei duo. Vix feugiat incorrupte no, eos debet persius debitis ea. Wisi quas consequat ea qui. Corpora partiendo no qui. Nam aeque consul facilis te, vitae petentium euripidis eos te. Virtute consequuntur signiferumque ex vis. Ex vix erat fabulas ocurreret, ei iusto consul referrentur est. At vel tation intellegebat, sit aperiri prodesset ea. Ad nullam reprehendunt conclusionemque has, ad quaestio argumentum voluptatibus per. An mea minim causae fastidii, consul labitur quo id, eam nihil nonumes veritus ea. Quo no nulla petentium, alii virtute ceteros et usu, an rebum possit nominati mei. Veri mandamus pertinacia ex eum.',
        price: 186
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Demo Suites 1', 'Demo Suites 2', 'Demo Suites 3', 'Demo Suites 4', 'Demo Suites 5',] }
    }, {});
  }
};
