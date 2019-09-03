const productModel = require('../models/product.model');

exports.getProduct = (req, res, next) => {
    var id = req.params.id;
    productModel.getProduct(id).then((product) => {
        res.render('product', {
            product: product
        });
    }).catch((err) => { 
        console.log(err);
        res.render('product', {
            product: 'not'
        });
     });
}