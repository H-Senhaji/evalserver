const Sequelize = require("sequelize");
const sequelize = require("../db");
const Batch = sequelize.define("batch", {
  number: {
    type: Sequelize.INTEGER,
  },
  start_date: {
    type: Sequelize.INTEGER,
    field: "start"
  },
  end_date: {
      type: Sequelize.INTEGER,
      field: "end" 
  }
});

module.exports = Batch;
