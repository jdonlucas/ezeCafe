'use strict';
module.exports = (sequelize, DataTypes) => {
  const discountOrder = sequelize.define('discountOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    discountId: {
      type: DataTypes.UUID,
      references: {
        model: 'discount',
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
    stack_order: DataTypes.INTEGER,
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  discountOrder.associate = function(models) {
    // associations can be defined here
  };
  return discountOrder;
};