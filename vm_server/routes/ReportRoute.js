const { Router } = require('express')
const ReportsController = require('../controllers/ReportsController')

const router = Router()

router.get('/journal', ReportsController.getJournal)
router.delete('/journal', ReportsController.deleteOtsenko)
router.get('/admission/:id', ReportsController.getAdmission)

module.exports = router
