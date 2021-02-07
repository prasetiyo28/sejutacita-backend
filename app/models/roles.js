'use strict';
module.exports = function(sequelize, DataTypes){
  const roles = sequelize.define('roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.STRING(50)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')

    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    tableName:'roles'
  });
  roles.associate = function(models) {
    roles.belongsTo(models.users, {
      foreignKey: 'id',
    });
    
  };
  return roles;
};