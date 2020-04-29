'use strict';
module.exports = (sequelize, DataTypes) => {
  const extraOrder = sequelize.define('extraOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    extraId: {
      type: DataTypes.UUID,
      references: {
        model: 'MenuExtra',
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
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  extraOrder.associate = function(models) {
    // associations can be defined here
  };
  return extraOrder;
};