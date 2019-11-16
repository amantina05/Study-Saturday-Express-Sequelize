const router = require('express').Router();

const tests = require('../db/models/test.js')

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


router.post('/student/student:Id', async (req, res, next) => {
  try {
    const newTest = await tests.create(req.body)
    res.status(201).send(newTest)
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
