const { Router } = require('express')
const Student = require ("../student/model")
const Evaluations = require ("../evaluations/model")
const router = new Router()


router.get("/aq/:batchId", (req, res, next) => {
//Bericht voor Wouter:
//req.params.batchId pakt niet in mijn parameter voor searchClass, alhoewel het naar mijn mening wel hier in zou moeten
//het werkt enkel als ik het als number hardcoded er in zet. Zoals hieronder:
  searchClass(3).then(students => {
      res.send(students)
  })
    .catch(next);
});
//zoek alle studenten wiens kleur hetzelfde is als een willekeurig gekozen kleur
searchClass =(batchId)=>{ // alle studenten uit de klas
  let myColor = randomColor();
   let chosenStudent = Student.findAll({ include: [{
     model: Evaluations,
     where: {colour: myColor}
    }]
  }).filter(student => student.batchId === batchId).then(students => { return students[Math.floor(Math.random()*students.length)] })

  return chosenStudent
}

randomColor =()=>{ //getal tussen 1 en 100 en de daarbijhorende kleur
  let randomColor
  let randomNumber = Math.floor(Math.random() * 101);
  if(randomNumber < 51){
    randomColor = "red"
  }
  if(randomNumber > 50 && randomNumber < 84){
    randomColor = "yellow"
  }
  if(randomNumber > 83){
    randomColor = "green"
  }
  return randomColor
}


//GET call verwacht /:batchID
//50% red, 33% yellow, 17% green (random 1tussen 1 nen 100) RED

//per student van batchID filter laatste grade met date (if any)
//filter alle studenten van batchID met laatste grade "kleur"
//[studentsMetKleur]
//random student uit [studentsMetKleur]



module.exports = router