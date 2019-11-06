const Sequelize = require("sequelize");
const db = require("../db");
const Batch = require("../batches/model");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surName: {
      type: Sequelize.STRING
  },
  batchId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Define relations
// - Make sure Models are imported correctly
// - Make sure force: true is on
// (otherwise we cannot change a table)
// - Make sure to not have circular dependencies
// (not like this:) Batch imports Student, Student import Batch
Student.belongsTo(Batch); // get the Batch for this student
Batch.hasMany(Student); // get me the Players of this Batch

module.exports = Student;
