'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('bulletinBoards','expiration', {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('bulletinBoards','expiration', {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      })
    ]);
  }
};
