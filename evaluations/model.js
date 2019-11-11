const Sequelize = require("sequelize");
const db = require("../db");

const Evaluations = db.define("evaluations", {
  remark: {
      type: Sequelize.STRING
  },
  studentId: {
    type: Sequelize.INTEGER
  },
  colour: {
      type: Sequelize.STRING
  },
date: {
  type: Sequelize.DATEONLY
}
}); 


// Evaluations
// Evaluations.belongsToMany(Student)
module.exports = Evaluations;
