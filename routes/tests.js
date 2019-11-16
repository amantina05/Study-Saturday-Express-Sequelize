const router = require('express').Router();

const tests = require('../db/models/test.js')
const Student = require('../db/models/student');


router.get('/', async (req, res, next) => {
  try {
    const allTests = await tests.findAll()
    res.json(allTests)
  }catch(erro) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const specificTest = await tests.findById(req.params.id)
    if(specificTest){
      res.json(specificTest)
    }else{
    res.status(200)
    }
  }catch(error) {
    next(error)
  }
})


router.post('/student/:studentId', async (req, res, next) => {
  try {
    //get student
    //create test
    //assignn student to test created

    const studentWant = await Student.findById(req.params.studentId)

    let newTest = await tests.create(req.body)

    let stduentTesst = await newTest.setStudent(studentWant)

    res.status(201).send(stduentTesst)
  }catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await tests.destroy ({
      where: {
        id: req.params.id
      }
    })
    res.status('204').send()
  }catch(error) {
    next(error)
  }
})
module.exports = router;

