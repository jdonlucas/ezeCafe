'use strict';

const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles',[
      {
        name: 'User',
        description: 'Common user',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Admin',
        description: 'Staff admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'SuperAdmin',
        description: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM \"Roles\";`
    );
    const sudo = roles[0];

    return await queryInterface.bulkInsert('Users',[
      {
        id: uuidv4(),
        Name: 'SuperAdmin',
        Email: 'admin@matrixp.fciencias.unam.mx',
        Password: bcrypt.hashSync('administrator', 10),
        Active: true,
        UserRole: sudo[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
