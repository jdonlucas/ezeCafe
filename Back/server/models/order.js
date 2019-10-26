'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {});
  Order.associate = function(models) {
    Order.hasOne(models.Sales,{
      as: 'order',
      foreignKey: 'OrderId'
    });
    Order.belongsTo(models.User,{
      foreignKey: 'UserId'
    });
    Order.belongsToMany(models.MenuFood,{
      through: 'FoodOrder',
      as: 'food',
      foreignKey: 'orderId',
      otherKey: 'foodId'
    });
    Order.belongsToMany(models.MenuBeveragesSpecific,{
      through: 'BeveragesOrder',
      as: 'beverages',
      foreignKey: 'orderBeveragesId',
      otherKey: 'beveragesId'
    })
  };

  return Order;
};