'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente'
    },
    subtotal: {
      allowNull: false,
      type: DataTypes.FLOAT
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
      onDelete: 'cascade',
      hooks: true
    });
    Order.belongsToMany(models.MenuBeveragesSpecific,{
      through: 'BeveragesOrder',
      as: 'beverages',
      foreignKey: 'orderId',
      onDelete: 'cascade',
      hooks: true
    });
    Order.belongsToMany(models.MenuSpecial,{
      through: 'specialOrder',
      as: 'special',
      foreignKey: 'orderId',
      onDelete: 'cascade',
      hooks: true
    })
  };

  return Order;
};