'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuBeveragesSpecific = sequelize.define('MenuBeveragesSpecific', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    size: DataTypes.STRING,
    milk: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  MenuBeveragesSpecific.associate = function(models) {
    MenuBeveragesSpecific.belongsTo(models.MenuBeverages,{
      foreignKey: 'id', 
      as: 'beverage'
    });
  };
  return MenuBeveragesSpecific;
};