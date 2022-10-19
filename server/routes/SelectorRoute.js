const { Router } = require('express')
const SelectorController = require('../controllers/SelectorController')

const router = Router()

router.get('/years', SelectorController.getYears)
router.get('/ws', SelectorController.getWs)
router.get('/semester/:id_ws', SelectorController.getSemester)
router.get('/faculties/:id_user', SelectorController.getFaculties)
router.get('/feduc', SelectorController.getFeduc)
router.get('/direction', SelectorController.getDirection)
router.get('/specialities', SelectorController.getSpecialities)
router.get('/group', SelectorController.getGroup)
router.get('/vid-zanyatie', SelectorController.getVidZanyatie)

module.exports = router
