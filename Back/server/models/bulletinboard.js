'use strict';
module.exports = (sequelize, DataTypes) => {
  const bulletinBoard = sequelize.define('bulletinBoard', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.TEXT,
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'anuncio'
    },
    expiration: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {});
  bulletinBoard.associate = function(models) {
    bulletinBoard.belongsTo(models.User,{
      foreignKey: 'UserId'
    });
  };
  return bulletinBoard;
};