'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

<<<<<<< HEAD
    await queryInterface.addColumn("expenses","Expensenote",{
=======
    await queryInterface.addColumn("expenses","note",{
>>>>>>> a7d6c8604e81462f525a4533269ad203892e652d
      type:Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

<<<<<<< HEAD
    await queryInterface.removeColumn('expenses',"Expensenote");
=======
    await queryInterface.removeColumn('expenses',"note");
>>>>>>> a7d6c8604e81462f525a4533269ad203892e652d
  }
};
