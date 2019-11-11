const Sequelize = require("sequelize");
const sequelize = require("../db");

const Batch = sequelize.define("batch", {
  number: {
    type: Sequelize.INTEGER,
  },
  start_date: {
    type: Sequelize.DATEONLY
  },
  end_date: {
    type: Sequelize.DATEONLY
  // },
  // updatedAt: {
  //   type: Sequelize.DATEONLY
  // },
  // createdAt: {
  //   type: Sequelize.DATEONLY
  }
});

module.exports = Batch;
