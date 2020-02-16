'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuBeverages = sequelize.define('MenuBeverages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {});
  MenuBeverages.associate = function(models) {
    MenuBeverages.hasMany(models.MenuBeveragesSpecific,{
      as: 'prices',
      foreignKey: 'beverageId',
      onDelete: 'cascade'
    })
  };
  return MenuBeverages;
};
