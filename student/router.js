const { Router } = require("express");
const Student = require("./model");
const Batch = require("../batches/model");

const router = new Router();

//DONE
router.get("/students", (req, res, next) => {
  Student.findAll()
    .then(students => {
      res.send(students);
    })
    .catch(next);
});

//DONE 
router.get("/students/:id", (req, res, next) => {
  Student.findByPk(req.params.id, { include: [Batch] })
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

//DONE CREATE 
router.post("/students", (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
});

//DONE DELETE
router.delete("/students/:studentId", (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

//DONE (UPDATE)
router.put("/students/:studentId", (req, res, next) => {
  Student.findByPk(req.params.studentId)
    .then(student => {
      // console.log("student FOUND?", student)
      if (student) {
        student.update(req.body).then(student => res.json(student));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
