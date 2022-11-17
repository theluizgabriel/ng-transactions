module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        idAccount: {
          allowNull: false,
          type: Sequelize.INTEGER
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('users');
    },
  };