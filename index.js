const express = require("express");

//middlewares
const bodyParser = require("body-parser");
const cors = require("cors");

const bodyParserMiddleWare = bodyParser.json();
//
const corsMiddleWare = cors();

//routers
const authRouter = require("./auth/router");
const studentRouter = require("./student/router");
const userRouter = require("./user/router");
const batchRouter = require("./batches/router");
const evalRouter = require("./evaluations/router");
const questionRouter = require("./askaquestion/questionrouter");

//models & db
const Batch = require("./batches/model");
const db = require("./db");
const User = require("./user/model");
const Student = require("./student/model");
const Evaluations = require("./evaluations/model");

//ini
const app = express();
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
  .use(evalRouter)
  .use(questionRouter)
  .listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

db.sync({ force: true })
  .then(() => {
    console.log("Database schema has been updated");
    //?? seeddata -> aanpassen sequelize format nu, null
    const batchModels = [
      {
      
        number: 21,
        start_date: "2019-01-01",
        end_date: "2019-02-02"
      },
      {
        number: 22,
        start_date: "2019-02-02",
        end_date: "2019-03-03"
      },
      {
        number: 23,
        start_date: "2019-03-03",
        end_date: "2019-04-04"
      }
    ];
    const batches = batchModels.map(batchModels => Batch.create(batchModels));
    return Promise.all(batches);
  })
  .then(() => {
    const students = [
      //evaluationid toevoegen!!
      { fullName: "Lorelai Gilmore", batchId: 1, photo: "" },
      { fullName: "Rory Gilmore", batchId: 2, photo: "" },
      { fullName: "Elon Musk", batchId: 3, photo: "" },
      { fullName: "Rein Codaisseur", batchId: 3, photo: ""},
      { fullName: "Wouter Codaisseur", batchId: 3, photo: ""},
      { fullName: "Kelley Codaisseur", batchId: 2, photo: ""},
      { fullName: "Jeroen Codaisseur", batchId: 2, photo: ""},
      { fullName: "Evelina Codaisseur", batchId: 1, photo: ""},
      { fullName: "Hafsa Codaisseur", batchId: 1, photo: ""}





      //seeddata
    ];

    const studentPromises = students.map(student => Student.create(student));
    return Promise.all(studentPromises);
  })
  //seeddata
  .then(() => {
    const evaluations = [
      {
        remark: "allright",
        colour: "yellow",
        studentId: 1,
        date: "2019-01-23"
      },
      {
        remark: "good",
        date: "2019-01-04",
        colour: "green",
        studentId: 9
      },
      {
        //id 3
        remark: "bad",
        colour: "red",
        studentId: 8,
        date: "2019-02-09"
      },
      {
        remark: "bad",
        date: "2019-02-01",
        colour: "red",
        studentId: 7
      },
      {
        remark: "allright",
        date: "2019-01-01",
        colour: "yellow",
        studentId: 6
      },
      {
        remark: "good",
        date: "2019-11-02",
        colour: "green",
        studentId: 2
      },
      {
        remark: "bad",
        date: "2019-12-01",
        colour: "red",
        studentId: 3
      },
      {
        remark: "allright",
        date: "2019-10-01",
        colour: "yellow",
        studentId: 5
      },
      {
        remark: "good",
        date: "2019-11-02",
        colour: "green",
        studentId: 4
      },
      {
        remark: "good",
        date: "2019-10-02",
        colour: "green",
        studentId: 4
      },
      {
        remark: "bad",
        date: "2019-02-02",
        colour: "red",
        studentId: 2
      },
      {
        remark: "good",
        date: "2019-09-02",
        colour: "green",
        studentId: 5
      },
      {
        remark: "allright",
        date: "2019-01-13",
        colour: "yellow",
        studentId: 9
      },
      
    ];
    const evaluationPromises = evaluations.map(evaluation =>
      Evaluations.create(evaluation)
    );
    return Promise.all(evaluationPromises);
  })
  .catch(console.error);
