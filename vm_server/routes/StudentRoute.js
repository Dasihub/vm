const { Router } = require('express')
const StudentController = require('../controllers/StudentController')

const router = Router()

router.get('/discipline', StudentController.getDiscipline)
router.get('/semester', StudentController.getSemester)
router.get('/teacher', StudentController.getTeacher)
router.get('/journal', StudentController.getJournal)
router.get('/passes/semester', StudentController.getSemesterForPasses)
router.post('/receipt', StudentController.postReceipt)
router.get('/payment', StudentController.getPayment)
router.delete('/payment/:id/:id_role/:id_user', StudentController.deletePayment)

module.exports = router
