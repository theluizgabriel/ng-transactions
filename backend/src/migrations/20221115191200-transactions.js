module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        creditedAId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        debitedAId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        value: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('transactions');
    },
  };