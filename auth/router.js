const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcryptjs");

const router = new Router();

//DONE
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Please give me some credentials, stranger" });
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.status(400).send({
          message: "Email or password incorrect, sorry"
        });
      } else if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          jwt: toJWT({ userId: user.id }) 
          // makes a token, with userId encrypted inside of it
        });
      } else {
        res.status(400).send({
          message: "Email or password incorrect, sorry"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});
// multiple callback functions, it is important to provide next
// as an argument to the callback function and then call next()
// within the body of the function to hand off control to
// the next callback.

module.exports = router;
