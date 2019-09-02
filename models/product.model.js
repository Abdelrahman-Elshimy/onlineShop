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

exports.getAllProducts = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            if(category !== 'all' && category) {
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
