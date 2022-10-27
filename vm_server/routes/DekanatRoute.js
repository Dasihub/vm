const { Router } = require('express');
const StudentsController = require('../controllers/DekanatController');
const router = Router();

router.get('/students', StudentsController.getStudents);
router.get('/access/:id_avn_login', StudentsController.getAccess);

module.exports = router;
