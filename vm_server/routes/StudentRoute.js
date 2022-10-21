const { Router } = require('express');
const StudentController = require('../controllers/StudentController');

const router = Router();

router.get('/discipline', StudentController.getDiscipline);
router.get('/semester', StudentController.getSemester);
router.get('/teacher', StudentController.getTeacher);
router.get('/journal', StudentController.getJournal);

module.exports = router;
