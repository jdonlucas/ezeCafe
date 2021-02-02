'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('discountOrders','quantity', {
        type: Sequelize.INTEGER,
        defaultValue: 1
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'discountOrders',
      'quantity'
    );
  }
};
