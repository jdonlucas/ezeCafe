'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuBeveragesSpecific = sequelize.define('MenuBeveragesSpecific', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    type: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  MenuBeveragesSpecific.associate = function(models) {
    MenuBeveragesSpecific.belongsTo(models.MenuBeverages,{
      foreignKey: 'beverageId', 
      as: 'beverage'
    });
    MenuBeveragesSpecific.belongsToMany(models.Order,{
      through: 'BeveragesOrder',
      as: 'beveragesOrder',
      foreignKey: 'beveragesId',
      hooks: true
    })
  };
  return MenuBeveragesSpecific;
};