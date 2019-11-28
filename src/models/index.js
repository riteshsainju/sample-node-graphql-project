import Sequelize from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.TEST_DATABASE || process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: 'postgres',
//   },
// );

const sequelize = new Sequelize('sample', 'ritesh', 'ritesh', {
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