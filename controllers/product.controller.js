const productModel = require('../models/product.model');

exports.getProduct = (req, res, next) => {
    var id = req.params.id;
    productModel.getProduct(id).then((product) => {
        res.render('product', {
            product: product,
            pagetTitle: 'Product',
            isLogin: req.session.userId
        });
    }).catch((err) => { 
        console.log(err);
        res.render('product', {
            product: 'not',
            pagetTitle: 'Product',
            isLogin: req.session.userId
        });
     });
}