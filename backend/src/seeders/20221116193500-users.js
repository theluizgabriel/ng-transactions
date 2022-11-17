module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('users', [
        {
          username: 'admin',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
          idAccount: 1
          // senha: secret_admin
        },
      ], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };