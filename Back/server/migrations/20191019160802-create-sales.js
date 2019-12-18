'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      pago: {
        type: Sequelize.STRING
      },
      ingreso: {
        type: Sequelize.FLOAT
      },
      costo: {
        type: Sequelize.FLOAT
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Order',
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
    return queryInterface.dropTable('Sales');
  }
};