const productModel = require('../models/product.model');
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        isLogin: true,
        isAdmin: true,
        pagetTitle: 'Add Product'
    });
}
exports.postAddProduct = (req, res, next) => {
    productModel.addProduct(req).then((product) => {
        console.log(product);
        res.redirect('/');
    }).catch((err) => {
        res.redirect('/add-product');
    });
}