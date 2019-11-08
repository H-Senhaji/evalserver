const express = require('express')
//part of node.js
//manage everything, from routes, to handling requests and views.


//middlewares
const bodyParser = require("body-parser");
const cors = require("cors");

const bodyParserMiddleWare = bodyParser.json();
//
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



app
.use(corsMiddleWare)
//cross-origin-resource allows cross domain communication
.use(bodyParserMiddleWare)
//extracts body of incoming req -> easier interface
.use(userRouter)
//signup
.use(authRouter)
//login
.use(batchRouter)
.use(studentRouter)

.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

db.sync({  })
.then(() => {
    console.log('Database schema has been updated')
//?? seeddata
const batch = [
  { number: 21, start_date: 121212, end_date: 131313 },
  { number: 22, start_date: 131313, end_date: 141414 },
  { number: 23, start_date: 141414, end_date: 151515 }
]
const batches = batch.map(batch => Batch.create({ batch }));
return Promise.all(batches);
})
.then(() => {
  const students = [
    { fullName: "Lorelai Gilmore", batchId: 1, color: "yellow" },
    { fullName: "Rory Gilmore", batchId: 2, color: "green" },
    { fullName: "Elon Musk", batchId: 3, color: "red"}
  //seeddata
  ];

  const studentPromises = students.map(student => Student.create(student));
  return Promise.all(studentPromises);
})
.catch(console.error);
