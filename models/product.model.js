const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/shop';

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String
});

const Product = mongoose.model('product', productSchema);

// add new product
exports.addProduct = (req) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return Product.findOne({ name: req.body.name })
        }).then((product) => {
            if (product) {
                reject('Product is Already Exist');
                mongoose.disconnect();
            }
            else {
                var product = new Product({ name: req.body.name, price: req.body.price, description: req.body.description, category: req.body.category, image: 'image.png' });
                return product.save();
            }
        }).then((product) => {
            resolve(product);
            mongoose.disconnect();

        }).catch(err => {
            reject(err)
            mongoose.disconnect();
        });
    });
}
exports.getAllProducts = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            if (category !== 'all' && category) {
                return Product.find({
                    category: category
                })
            }
            else {
                return Product.find()
            }

        }).then((products) => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => reject(err));
    });
}

exports.getProduct = (productId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return Product.findById(productId)
        }).then((product) => {
            mongoose.disconnect();
            resolve(product);
        }).catch((err) => reject(err));
    });
}
