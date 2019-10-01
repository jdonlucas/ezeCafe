'use strict';

const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles',[
      {
        name: 'Mesero',
        description: 'Empleado con rol de mesero',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Caja',
        description: 'Empleado con rol de caja',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Admin',
        description: 'Empleado Staff con permiso de caja/mesero/inventario',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'SuperAdmin',
        description: 'Super Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM Roles;`
    );
    const sudo = roles[0];

    return await queryInterface.bulkInsert('Users',[
      {
        id: uuidv4(),
        Name: 'SuperAdmin',
        Lastname: 'Donlucas',
        Username: 'superadmin',
        Password: bcrypt.hashSync('administrator', 10),
        Active: true,
        UserRole: sudo[3].id,
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
