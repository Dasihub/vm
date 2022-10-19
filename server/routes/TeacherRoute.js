const { Router } = require('express')
const TeacherController = require('../controllers/TeacherController')

const router = Router()

router.get('/discipline', TeacherController.getDiscipline)
router.get('/semester', TeacherController.getSemester)
router.get('/group', TeacherController.getGroup)
router.get('/vid-zanyatie', TeacherController.getVidZanyatie)
router.get('/student-list', TeacherController.getStudentList)
router.get('/subgroup-students', TeacherController.getSubGroupStudents)
router.get('/otsenka', TeacherController.getOtsenka)
router.put('/otsenka', TeacherController.updateOtsenka)
router.post('/otsenka', TeacherController.postOtsenko)
router.post('/subgroup', TeacherController.postSubGroup)

module.exports = router
