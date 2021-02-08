'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        id: '1',
        name: 'admin sejuta cita',
        username: 'admin_sejutacita',
        email: 'admin@sejutacita.id',
        password: bcrypt.hashSync('admin', 10),
        id_role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */

      return queryInterface.bulkDelete('users', null, {});
  }
};
