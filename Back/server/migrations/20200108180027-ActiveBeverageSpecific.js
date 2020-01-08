'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('MenuBeveragesSpecifics','status', {
        type: Sequelize.STRING,
        defaultValue: 'active'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'MenuBeveragesSpecifics',
      'status'
    );
  }
};
