'use strict';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      Name: {
        type: Sequelize.STRING
      },
      Lastname: {
        type: Sequelize.STRING
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      UserRole: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
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
    return queryInterface.dropTable('Users');
  }
};