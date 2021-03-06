const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DB_URL = 'mongodb+srv://Abdelrahman:EHaQS00IQAjp6soT@cluster0-pagsq.mongodb.net/shop?retryWrites=true&w=majority';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('user', userSchema);

// register by email and password and username
exports.register = (req) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return userModel.findOne({ email: req.body.email })
        }).then((user) => {
            if (user) {
                reject('E-Mail Already Used');
                mongoose.disconnect();
            }
            else {
                return bcrypt.hash(req.body.password, 10)
            }
        }).then((pass) => {
            var user = new userModel({ username: req.body.username, email: req.body.email, password: pass });
            return user.save();
        }).then((user) => {
            resolve(user);
            mongoose.disconnect();

        }).catch(err => {
            reject(err)
            mongoose.disconnect();
        });
    });
}

// login by email and password
exports.loging = (req) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return userModel.findOne({ email: req.body.email })
        }).then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(same => {
                    if (!same) {
                        reject('Password Not Correct');
                        mongoose.disconnect();
                    }
                    else {
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        });
                        mongoose.disconnect();
                    }
                }).catch((err) => {
                    reject('Password Not Correct');
                    mongoose.disconnect();
                })
            }
            else {
                reject('No User Matches this email');
                mongoose.disconnect();
            }
        }).catch((err) => {
            reject('Email or password not correct');
            mongoose.disconnect();
        })
    });
}

