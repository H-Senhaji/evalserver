const Sequelize = require("sequelize");
const sequelize = require("../db");

const Batch = sequelize.define("batch", {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATE,
    field: "start"
  },
  end_date: {
      type: Sequelize.DATE,
      field: "end" 
  }
});

module.exports = Batch;
