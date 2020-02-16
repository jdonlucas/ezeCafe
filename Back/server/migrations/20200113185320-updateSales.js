'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Sales', 'OrderId', {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        },
        unique: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => { 
    return Promise.all([
      queryInterface.changeColumn('Sales', 'OrderId', {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        }
      })
    ]); 
  }
};
