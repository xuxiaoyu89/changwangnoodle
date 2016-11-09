'use strict';

module.exports = function (sequelize, DataTypes) {
  let model = sequelize.define('user', {
    username: DataTypes.STRING(256),
    password: DataTypes.STRING(256)
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'USER'
  });

  return model;
};
