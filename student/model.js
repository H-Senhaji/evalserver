const Sequelize = require("sequelize");
const db = require("../db");
const Batch = require("../batches/model");
const Evaluations = require("../evaluations/model")

const Student = db.define("student", {
  fullName: {
      type: Sequelize.STRING,
      required: true
  },
  batchId: {
    type: Sequelize.INTEGER,
  },
  photo: {
    type: Sequelize.STRING,
    
    // required: true
  
  // },
//   createdAt: {
//     type: Sequelize.DATEONLY
// },
// updatedAt: {
//   type: Sequelize.DATEONLY
}
}); 


Student.belongsTo(Batch); // get the Batch for this student
Batch.hasMany(Student); // get me the Players of this Batch
Student.hasMany(Evaluations)
Evaluations.belongsTo(Student)
//update zonder bovenstaande resulteert in error student is not associated
//to evaluations

// want Evaluations has many students as well ?
//met een werkend front end en echte data zou dit kunnen zijn
//many to many? aangezien ik de evaluatie dan in pure code heb en
//herbruikbaar is bij elke studen

module.exports = Student;
