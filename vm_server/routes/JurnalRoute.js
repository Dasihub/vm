const { Router } = require('express')
const JurnalController = require('../controllers/JurnalController')
const router = Router()

router.get('/dopusk/:lang', JurnalController.getDopusk)
router.get('/dopusk-detal/:lang', JurnalController.getDopuskDetal)
router.get('/vid-dopusk/:lang', JurnalController.getVidDopusk)

module.exports = router
