'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bulletinBoards', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      message: {
        type: Sequelize.TEXT('medium')
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'anuncio'
      },
      expiration: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bulletinBoards');
  }
};