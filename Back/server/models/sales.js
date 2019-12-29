'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    pago: DataTypes.STRING,
    ingreso: DataTypes.FLOAT,
    costo: DataTypes.FLOAT
  }, {});
  Sales.associate = function(models) {
    Sales.belongsTo(models.Order,{
      foreignKey: 'OrderId'
    });
  };
  return Sales;
};