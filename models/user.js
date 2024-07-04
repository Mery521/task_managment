'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
    });
    
    User.hasMany(models.AccessToken, {
      foreignKey: 'userId',
      as: 'accessTokens',
    });

  };

  return User;
};