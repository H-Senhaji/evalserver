const { Router } = require('express')
const Batch = require("./model")
const authMiddleWare = require("../auth/middleware");
const Student = require("../student/model")
const router = new Router()

router.get("/batches", (req, res, next) => {
  Batch.findAll()
    .then(batches => {
      res.send(batches);
    })
    .catch(next);
});

router.get("/batches/:batchId", (req, res, next) => {
  Batch.findByPk(req.params.batchId, { include: [Student] })
    .then(batch => {
      res.send(batch);
    })
    .catch(next);
});


// Create a new batch account
router.post("/batches", authMiddleWare, (req, res, next) => {
    console.log("Do we have the user of this request?", req.user);
    // since this was an authenticated route, we now have req.user
    // it contains all info about this user (actually req.user is a Sequelize User instance)
  
    // You can interact with the database record of this user as well:
    // req.user.update()
  
    // const userId = req.body.userId // NO!
    Batch.create(req.body)
      .then(batch => res.json(batch))
      .catch(next);
  });
  


module.exports = router;
