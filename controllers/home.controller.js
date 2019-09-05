const productModel = require('../models/product.model');
exports.getHome = (req, res, next) => {
    let category = req.query.category;
    let validCategories = ['clothes', 'phones', 'computers'];

    if(validCategories.includes(category) && category) {
        productModel.getAllProducts(category).then(products => {
            res.render('index', {
                products: products,
                pagetTitle: 'Home',
                isLogin: req.session.userId
            });
        });
    }
    else {
        productModel.getAllProducts().then(products => {
            res.render('index', {
                products: products,
                pagetTitle: 'Home',
                isLogin: req.session.userId
            });
        });
    }
    
 }