const express = require('express')

//routers
const authRouter = require('./auth/router')
const userRouter = require('./user/router')

//models & db
const db = require('./db')
const User = require('./user/model')

//init
const app = express()
const port = process.env.PORT || 4000;

//middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const bodyParserMiddleWare = bodyParser.json();
const corsMiddleWare = cors();

// const loggingMiddleWare = (req, res, next) => {
//     console.log("I am a middleware", Date.now());
//     next(); // everything is ok -> next()
//   };

app
// .use(loggingMiddleWare)
.use(corsMiddleWare)
.use(bodyParserMiddleWare)
.use(userRouter)
.use(authRouter)
.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

db.sync({ force: true })
.then(() => {
    console.log('Database schema has been updated')
})