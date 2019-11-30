import Sequelize from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
  process.env.DB_NAME,  
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    define: {
      underscored: true,
    },
    dialect: 'postgres',
});

const models = {
  User: sequelize.import('./user'),
  UserProfile: sequelize.import('./userProfile'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;