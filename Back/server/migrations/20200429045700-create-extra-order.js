'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('extraOrders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      extraId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'MenuExtras',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    { charset: 'utf8'});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('extraOrders');
  }
};