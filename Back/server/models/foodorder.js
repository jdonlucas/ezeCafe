'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodOrder = sequelize.define('FoodOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    foodId: {
      type: DataTypes.UUID,
      references: {
        model: 'MenuFood',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'Order',
        key: 'id'
      }
    }
  }, {});
  FoodOrder.associate = function(models) {
    // associations can be defined here
  };
  return FoodOrder;
};