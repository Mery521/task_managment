'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('1', '2'), // 1 - active, 2 - inactive
      allowNull: false,
      defaultValue: '1',
    },
  }, {
    tableName: 'tasks',
    timestamps: true,
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  };

  return Task;
};
