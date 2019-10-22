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
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Insumos.associate = function(models) {
    // associations can be defined here
  };
  return Insumos;
};