const userModel = require('../models/user.model');


exports.goToSignup = (req, res, next) => {
    res.render('signup');
}   
exports.register = (req, res, next) => {
    userModel.register(req).then((user) => {
        res.redirect('/login');
    }).catch((err) => {
        console.log('not created');
        res.send(err);
    })
}

exports.goToLogin = (req, res, next) => {
    res.render('login');
}   

exports.login = (req, res, next) => {
    userModel.loging(req).then((id) => {
        req.session.userId = id;
        res.redirect('/');
    }).catch((err) => {
        res.send(err);
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}