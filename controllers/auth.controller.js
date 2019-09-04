const userModel = require('../models/user.model');
const validatorResult = require('express-validator').validationResult;


exports.goToSignup = (req, res, next) => {
    res.render('signup');
}
exports.register = (req, res, next) => {

    if (validatorResult(req).array().length > 0) {
        console.log(validatorResult(req).array());
        res.render('signup', {
           valids:  validatorResult(req).array(),
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
             });
        })
    }

}

exports.goToLogin = (req, res, next) => {

    res.render('login', {
        authErr: req.flash('authErr')[0]
    });
}

exports.login = (req, res, next) => {
    userModel.loging(req).then((id) => {
        req.session.userId = id;
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