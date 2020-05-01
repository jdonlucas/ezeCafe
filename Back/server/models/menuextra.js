'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuExtra = sequelize.define('MenuExtra', {
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
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'otros'
    }
  }, {});
  MenuExtra.associate = function(models) {
    MenuExtra.belongsToMany(models.Order,{
      through: 'extraOrder',
      as: 'extraOrders',
      foreignKey: 'extraId',
      hooks: true
    })
  };
  return MenuExtra;
};