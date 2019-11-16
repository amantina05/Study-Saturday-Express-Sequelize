const router = require('express').Router();

const students = require('../db/models/student.js')


router.get('/', async (req, res, next) => {
  try {
    const allStudents = await students.findAll()
    res.json(allStudents)
  } catch (error) {
    next(error)
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const specificStudents = await students.findById(req.params.id)
//checking if students exists
    if (specificStudents) {
    res.json(specificStudents)
    } else {
    res.status(404).send('Not Found')
    }
  } catch (error) {
    // next(error)
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  // console.log(req.body)
  try {
    const newStudent = await students.create(req.body)
    res.status(201).send(newStudent)
  } catch (error) {
    next(error)
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    let updateInfo = await students.update(req.body, {
      where: {
        //telling which student to update
        id: req.params.id},
        returning: true,
        plain: true
    })
    res.send(updateInfo[1])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await students.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status('204').send()
  } catch (error) {
    next(error)
  }
})

module.exports = router;


