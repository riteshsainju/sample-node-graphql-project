'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('user_profile', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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