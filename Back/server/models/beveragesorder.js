'use strict';
module.exports = (sequelize, DataTypes) => {
  const BeveragesOrder = sequelize.define('BeveragesOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    beveragesId: {
      type: DataTypes.UUID,
      references: {
        model: 'MenuBeveragesSpecific',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER
  }, {});
  BeveragesOrder.associate = function(models) {
    // associations can be defined here
  };
  return BeveragesOrder;
};