'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.User,{
      as: 'users',
      foreignKey: 'UserRole'
    })
  };
  return Role;
};