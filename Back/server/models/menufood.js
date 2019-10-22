'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuFood = sequelize.define('MenuFood', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  MenuFood.associate = function(models) {
    MenuFood.belongsToMany(models.Order,{
      through: 'FoodOrder',
      as: 'foodOrders',
      foreignKey: 'foodId',
      otherKey: 'orderId'
    })
  };
  return MenuFood;
};