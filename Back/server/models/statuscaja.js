'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusCaja = sequelize.define('StatusCaja', {
    inicio: DataTypes.FLOAT,
    progreso: DataTypes.FLOAT,
    final: DataTypes.FLOAT
  }, {});
  StatusCaja.associate = function(models) {
    // associations can be defined here
  };
  return StatusCaja;
};