'use strict';
module.exports = (sequelize, DataTypes) => {
  const specialOrder = sequelize.define('specialOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    specialId: {
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
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  specialOrder.associate = function(models) {
    // associations can be defined here
  };
  return specialOrder;
};