const userModel = require('../models/user.model');
const validatorResult = require('express-validator').validationResult;


exports.goToSignup = (req, res, next) => {
    res.render('signup', {
        pagetTitle: 'Register',
        isLogin: req.session.userId
    });
}
exports.register = (req, res, next) => {

    if (validatorResult(req).array().length > 0) {
        res.render('signup', {
           valids:  validatorResult(req).array(),
           pagetTitle: 'Register',
           isLogin: req.session.userId
        });
    }
    else {
        userModel.register(req).then((user) => {
            res.redirect('/login');
        }).catch((err) => {
            let arr  = [];
            arr.push({
                msg: err
            });

            res.render('signup', {
                valids:  arr,
                pagetTitle: 'Register',
                isLogin: req.session.userId
             });
        })
    }

}

exports.goToLogin = (req, res, next) => {

    res.render('login', {
        authErr: req.flash('authErr')[0],
        pagetTitle: 'Login',
        isLogin: req.session.userId
    });
}

exports.login = (req, res, next) => {
    userModel.loging(req).then((result) => {
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin;
        res.redirect('/');
    }).catch((err) => {
        req.flash('authErr', err);
        res.redirect('/login');
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}