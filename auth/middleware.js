const User = require("../user/model");
// Import toData, that decrypts our token and gives the encrypted data
const { toData } = require("./jwt");
//using this to check if someone is logged in to f.e. create a batch

function authMiddleWare(req, res, next) {
  // check if we have a header, split on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" "); //??

  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      // Decrypts token to get the encrypted data (should contain userId)
      const data = toData(auth[1]);
      User.findByPk(data.userId)
        .then(user => {
          if (!user) return next("User does not exist");

          req.user = user;
          // so we can use in the next step
          // not allowed to send a user in the body of a request
          next();
        })
        .catch(next);
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.email}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
}

module.exports = authMiddleWare;
