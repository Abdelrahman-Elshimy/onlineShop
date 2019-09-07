const cartModel = require('../models/cart.model');

exports.addNewCartItem = (req, res, next) => {
    let cartOb = req.body;
    cartOb.userId = req.session.userId;
    cartOb.timestamp = 16423,
        cartModel.addNewCartItem(cartOb).then((cartItem) => {
            res.redirect('/');
        }).catch((err) => {
            res.redirect('/');
        });
}

exports.getCartItems = (req, res, next) => {
    cartModel.getCartItems(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            pagetTitle: 'Cart',
            isLogin: req.session.userId
        });
    }).catch((err) => res.send(err));
}