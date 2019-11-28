'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {type: DataTypes.STRING,
      unique: true},
    username:{type: DataTypes.STRING,
      unique: true},
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(models.UserProfile);  };
  return User;
};