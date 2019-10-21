'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuBeverages = sequelize.define('MenuBeverages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING
  }, {});
  MenuBeverages.associate = function(models) {
    MenuBeverages.hasMany(models.MenuBeveragesSpecific,{
      foreignKey: 'specific',
      onDelete: 'cascade'
    })
  };
  return MenuBeverages;
};