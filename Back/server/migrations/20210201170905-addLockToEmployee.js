'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('discounts','one_per_customer', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('discounts','one_per_employee', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'discounts',
        'one_per_customer'
      ),
      queryInterface.removeColumn(
        'discounts',
        'one_per_employee'
      )
    ])
  }
};
