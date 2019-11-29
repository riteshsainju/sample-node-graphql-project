const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {
    const user = await queryInterface.rawSelect('users', {
      where: {
        email: 'admin@demo.com',
      },
    }, ['id']);

    if(!user) {
      const hashedPassword = await bcrypt.hash('test@123', 12);
    const a = await queryInterface.bulkInsert('users', [{
      username: 'admin',
      email: 'admin@demo.com',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    }])
console.log(a)
    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const userRows = users[0];
    await  queryInterface.bulkInsert('user_profiles', [{
      user_id: userRows[0].id,
      first_name: 'John',
      last_name: 'Doe',
      created_at: new Date(),
      updated_at: new Date()
  }])
  }
},

  down: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.rawSelect('users', {
      where: {
        email: 'admin@demo.com',
      },
    }, ['id']);
    console.log(userId,'userId')
    if(userId) {

    await queryInterface.bulkDelete('user_profiles', {user_id: userId}, {});
    await queryInterface.bulkDelete('users', {id: userId}, {});  }
  }
};
