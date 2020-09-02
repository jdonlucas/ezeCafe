'use strict';	

module.exports = {	
  up: (queryInterface, Sequelize) => {	
    return Promise.all([	
      queryInterface.addColumn('MenuExtras','type', {	
        type: Sequelize.STRING,	
        defaultValue: 'otros'	
      })	
    ]);	
  },	

  down: (queryInterface, Sequelize) => {	
    return queryInterface.removeColumn(	
      'MenuExtras',	
      'type'	
    );	
  }	
};
