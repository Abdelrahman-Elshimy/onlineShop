const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/shop';

const cartSchema = mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const cartModel = mongoose.model('cart', cartSchema);

exports.addNewCartItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            var cartItem = new cartModel(data);
            return cartItem.save();
        }).then((cartitem) => {
            resolve(cartitem);
            mongoose.disconnect();
        }).catch((err) => {
            reject(err)
            mongoose.disconnect();
        });
    })
}

exports.getCartItems = userIdd => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return cartModel.find({ userId: userIdd }, {}, { sort: { name: -1 } })
        }).then((cartItems) => {
            resolve(cartItems);
            mongoose.disconnect();
        }).catch((err) => {
            reject(err);
            mongoose.disconnect();
        });
    });
}
