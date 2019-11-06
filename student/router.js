const { Router } = require('express');
const Student = require('./model');
const Batch = require('../batches/model')

const router = new Router();

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => {
      res.send(students);
    })
    .catch(next);
});

router.get('/students/:id', (req, res, next) => {
  Student.findByPk(req.params.id, { include: [ Batch ] })
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

// // Create a new student account
router.post("/students", (req, res, next) => {
  // console.log("WHAT IS REQ.BODY", req.body)
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next)
});

router.delete("/students/:studentId", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
  // res.send('Some people want to watch the world burn') // -> route works

  Student.destroy({
    where: {
      id: req.params.studentId,
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

router.put("/students/:studentId", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Student.findByPk(req.params.studentId)
    .then(student => {
      // console.log("student FOUND?", student)
      if (student) {
        student
          .update(req.body)
          .then(student => res.json(student));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
