'use strict';
module.exports = (sequelize, DataTypes) => {
  const discount = sequelize.define('discount', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    one_per_customer: DataTypes.BOOLEAN,
    one_per_employee: DataTypes.BOOLEAN
  }, {});
  discount.associate = function(models) {
    discount.belongsToMany(models.Order,{
      through: 'discountOrder',
      as: 'discountOrders',
      foreignKey: 'discountId',
      hooks: true
    })
  };
  return discount;
};