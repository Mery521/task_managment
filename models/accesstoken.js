'use strict';

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'access_tokens',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  AccessToken.associate = function(models) {
    AccessToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return AccessToken;
};
