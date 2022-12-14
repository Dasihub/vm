const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/AuthController');

router.post('/auth/login', AuthController.login);
router.get('/auth/check', AuthController.check);
router.get('/auth/logout', AuthController.logout);
router.get('/user', AuthController.userInfo);
router.get('/auth/token', AuthController.isToken);

module.exports = router;
