const { Router } = require('express')
const Batch = require("./model")
const authMiddleWare = require("../auth/middleware");
const Student = require("../student/model")

const router = new Router()

//DONE
router.get("/batches", (req, res, next) => {
  Batch.findAll()
    .then(batches => {
      res.send(batches);
    })
    .catch(next);
});


//DONE
router.get("/batches/:batchId", (req, res, next) => {
  Batch.findByPk(req.params.batchId, { include: [Student] })
    .then(batch => {  //promise
      res.send(batch);
    })
    .catch(next);
});




//authmiddleware checkt of je wel ingelogd bent om dit te kunnen doen
// DONE
router.post("/batches", authMiddleWare, (req, res, next) => {
    console.log("Do we have the user of this request?", req.user);
    Batch.create(req.body)
      .then(batch => res.json(batch))
      .catch(next);
  });
  


module.exports = router;
