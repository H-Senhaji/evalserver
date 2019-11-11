const { Router } = require('express')
const Student = require("../student/model")
const Evaluations = require('./model')

const router = new Router()

//might not be needed
router.get("/evaluations", (req, res, next) => {
  // console.log('whatsreq', req)

    Evaluations.findByPk(req.params.id, { include: [Student] })
     
    .then(evaluations => {
        res.send(evaluations);
      })
      .catch(next);
  });

  router.get("/evaluations/:id", (req, res, next) => {
    Evaluations.findByPk(req.params.id, { include: [Student] })
      .then(evaluations => {
        res.send(evaluations);
      })
      .catch(next);
  });
  
//evaluation put it with student id?
  //async
  router.post("/evaluations", (req, res, next) => {
    // console.log('whatsreq', req.params)
    Evaluations.create(req.body)
      .then(evaluations => res.json(evaluations))
      .catch(next);
  });
  

  //update evaluations?


// router.put("/evaluations/:evaluationId", (req, res, next) => {
//   // res.send('oh hi')
//   // console.log(req.params, 'WRECKED BY PARAMS??')
//   Evaluation.findByPk(req.params.evaluationId)
//     .then(evaluation => {
//       // console.log("player FOUND?", player)
//       if (evaluation) {
//         evaluation
//           .update(req.body)
//           .then(evaluation => res.json(evaluation));
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(next);
// });
  

  module.exports= router