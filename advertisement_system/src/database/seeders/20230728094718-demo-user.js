'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('categories', [{
      id: 4,    
      name: 'Furniture',
      parent_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 5,    
      name: 'Sofa',
      parent_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 6,
      name: 'Chair',
      parent_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }],);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
