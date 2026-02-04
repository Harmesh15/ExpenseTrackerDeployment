'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'expenses',
      'Expensenote',
      {
        type: Sequelize.STRING,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'expenses',
      'Expensenote'
    );
  }
};
