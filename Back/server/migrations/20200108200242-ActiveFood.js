'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('MenuFoods','status', {
        type: Sequelize.STRING,
        defaultValue: 'active'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'MenuFoods',
      'status'
    );
  }
};
