const router = require('express').Router();
const bodyParser = require('body-parser');

const bodyParserM = bodyParser.urlencoded({
    extended: true,
});
const authController = require('../controllers/auth.controller');
router.get('/signup', authController.goToSignup);
router.post('/register', bodyParserM, authController.register);
router.get('/login', authController.goToLogin);
router.post('/login',bodyParserM, authController.login);
router.get('/logout', authController.logout);

module.exports = router;