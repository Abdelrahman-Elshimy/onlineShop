const router = require('express').Router();
const check = require('express-validator').check;
const bodyParser = require('body-parser');
const bodyParserM = bodyParser.urlencoded({
    extended: true,
});
const authGuard = require('./guards/auth.guard');

const adminController = require('../controllers/admin.controller');

router.get('/add-product',authGuard.isAuth, adminController.getAddProduct);
router.post('/add-product', bodyParserM, adminController.postAddProduct);

module.exports = router;