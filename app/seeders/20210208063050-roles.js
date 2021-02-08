'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('roles', 
   [{
    id: '1',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('roles', null, {});
  }
};
