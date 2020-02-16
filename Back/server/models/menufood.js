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
    price: DataTypes.FLOAT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {});
  MenuFood.associate = function(models) {
    MenuFood.belongsToMany(models.Order,{
      through: 'FoodOrder',
      as: 'foodOrders',
      foreignKey: 'foodId',
      hooks: true
    })
  };
  return MenuFood;
};
