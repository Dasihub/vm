const { Router } = require('express')
const DekanatController = require('../controllers/DekanatController')
const router = Router()

router.get('/students', DekanatController.getStudents)
router.get('/access/:id_avn_login', DekanatController.getAccess)
router.get('/working', DekanatController.getWorking)
router.put('/journal', DekanatController.journalUpdate)

module.exports = router
