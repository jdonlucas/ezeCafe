'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consumibles = sequelize.define('Consumibles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Consumibles.associate = function(models) {
    // associations can be defined here
  };
  return Consumibles;
};