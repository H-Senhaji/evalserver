const express = require('express')

//middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const bodyParserMiddleWare = bodyParser.json();
const corsMiddleWare = cors();

//routers
const authRouter = require('./auth/router')
const studentRouter = require('./student/router')
const userRouter = require('./user/router')
const batchRouter = require('./batches/router')

//models & db
const Batch = require("./batches/model")
const db = require('./db')
const User = require('./user/model')
const Student = require('./student/model')

//ini
const app = express()
const port = process.env.PORT || 4000;



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
.use(batchRouter)
.use(studentRouter)

.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

db.sync({})
.then(() => {
    console.log('Database schema has been updated')

const batchNumbers = [31, 30, 29]

const batches = batchNumbers.map(batchNumber => Batch.create({ number: batchNumber }));
return Promise.all(batches);
})
.then(() => {
  const students = [
    { firstName: "Lorelai", surName: "Gilmore", batchId: 1},
    { firstName: "Rory", surName: "Gilmore", batchId: 2 },
  ];

  const studentPromises = students.map(student => Student.create(student));
  return Promise.all(studentPromises);
})
.catch(console.error);
