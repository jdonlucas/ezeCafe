'use strict';
module.exports = (sequelize, DataTypes) => {
  const Insumos = sequelize.define('Insumos', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    grammageLiters: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Insumos.associate = function(models) {
    // associations can be defined here
  };
  return Insumos;
};