const router = require('express').Router();
const ProductController = require('../controllers/product.controller');

router.get('/', (req, res, next) => {
    res.redirect('/');
});
router.get('/:id', ProductController.getProduct);

module.exports = router;