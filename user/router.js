const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcryptjs");

const router = new Router();

//DONE
router.post("/users", (req, res, next) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then(() => res.status(201).send({ message: "User created succesfully" }))
    .catch(next);
});

module.exports = router;
