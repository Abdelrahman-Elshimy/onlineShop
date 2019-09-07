const router = require('express').Router();
const bodyParser = require('body-parser');
const authGuard = require('./guards/auth.guard');

const bodyParserM = bodyParser.urlencoded({
    extended: true,
});

const cartController = require('../controllers/cart.controller');

router.get('/cart', cartController.getCartItems);
router.post('/cart', authGuard.isAuth, bodyParserM, cartController.addNewCartItem);

module.exports = router;