'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('user_profile', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  UserProfile.associate = function(models) {
    UserProfile.belongsTo(models.User,{      
      foreignKey: {
        name: 'userId',
        field: 'user_id',
    },});
    
    };
  return UserProfile;
};