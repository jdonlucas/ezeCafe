'use strict';
var CustomValidations = require('../CustomValidations');
var modelName = 'User';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const User = sequelize.define(modelName, {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    Name: {
      type: DataTypes.STRING
    },
    Lastname: {
      type: DataTypes.STRING
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: CustomValidations.isUnique(modelName, "Username")
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          min: 6,
          msg: "Password must be at least 6 characters in lenght"
        }
      }
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      defaultScope: {
        attributes: { exclude: ['Password', 'Active', 'createdAt', 'updatedAt'] },
      },
      scopes: {
        withPassword: {
          attributes: { exclude: ['Active', 'createdAt', 'updatedAt'] },
        }
      },
      hooks: {
        beforeCreate: function (user) {
          const bcrypt = require('bcryptjs');
          user.Password = user.Password ? user.Password : "";
          user.Password = bcrypt.hashSync(user.Password, 10);
        },
        beforeSave: function (user) {
          const bcrypt = require('bcryptjs');
          if (user.Password) {
            if (user.Password.length !== 60) {
              user.Password = user.Password ? user.Password : "";
              user.Password = bcrypt.hashSync(user.Password, 10);
            }
          }
        }
      }
    });

  User.associate = function (models) {
    User.belongsTo(models.Role,{
      foreignKey: 'UserRole'
    });
  };

  User.prototype.validatePassword = function (confirmPassword) {
    const bcrypt = require('bcryptjs');
    this.Password = this.Password ? this.Password : "";
    return bcrypt.compareSync(confirmPassword, this.Password)
  };

  return User;
};
