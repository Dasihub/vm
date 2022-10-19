const { Router } = require('express')
const StudentsController = require('../controllers/DekanatController')
const router = Router()

router.get('/students', StudentsController.getStudents)

module.exports = router
