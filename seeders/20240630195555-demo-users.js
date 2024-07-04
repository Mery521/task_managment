const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const hashedPassword1 = await bcrypt.hash('hashed_password_1', saltRounds);
    const hashedPassword2 = await bcrypt.hash('hashed_password_2', saltRounds);
    
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        password: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
