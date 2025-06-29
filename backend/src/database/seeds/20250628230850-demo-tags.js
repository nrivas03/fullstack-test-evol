'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'urgente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trabajo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'personal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'estudios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'salud',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'casa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'compras',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'proyecto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};