'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
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
    Order.hasOne(models.Sales);
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
    });
    Order.belongsToMany(models.MenuExtra,{
      through: 'extraOrder',
      as: 'extra',
      foreignKey: 'orderId',
      onDelete: 'cascade',
      hooks: true
    })
    Order.belongsToMany(models.discount,{
      through: 'discountOrder',
      as: 'discount',
      foreignKey: 'orderId',
      onDelete: 'cascade',
      hooks: true
    });
  };

  return Order;
};
