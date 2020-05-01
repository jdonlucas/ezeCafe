'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Sales','plataforma', {
        type: Sequelize.STRING,
        defaultValue: ''
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Sales',
      'plataforma'
    );
  }
};
