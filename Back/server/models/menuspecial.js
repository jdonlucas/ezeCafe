'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuSpecial = sequelize.define('MenuSpecial', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    product: DataTypes.STRING,
    price: DataTypes.FLOAT,
    type: {
      allowNull: false,
      type:DataTypes.STRING,
      defaultValue: 'empleado'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {});
  MenuSpecial.associate = function(models) {
    MenuSpecial.belongsToMany(models.Order,{
      through: 'specialOrder',
      as: 'specialOrders',
      foreignKey: 'specialId',
      hooks: true
    })
  };
  return MenuSpecial;
};
