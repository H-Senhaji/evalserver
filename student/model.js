const Sequelize = require("sequelize");
const db = require("../db");
const Batch = require("../batches/model");

const Student = db.define("student", {
  fullName: {
      type: Sequelize.STRING
  },
  batchId: {
    type: Sequelize.INTEGER,
   
  },
  photo: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  }
}); 


Student.belongsTo(Batch); // get the Batch for this student
Batch.hasMany(Student); // get me the Players of this Batch

module.exports = Student;
