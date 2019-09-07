const express = require('express');
const path = require('path');

// sessions
const flash = require('connect-flash');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);

// routes
const homeRoutes = require('./routes/home.routes');
const productRoutes = require('./routes/product.routes');
const signupRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// static 
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

// view engine
app.set('view engine', 'ejs');

// store session
const Store = new SessionStore({
    uri: 'mongodb+srv://Abdelrahman:EHaQS00IQAjp6soT@cluster0-pagsq.mongodb.net/shop?retryWrites=true&w=majority',
    collection: 'sessions'
});

// session express middlware
app.use(session({
    secret: 'make myu secret secret is my secret',
    saveUninitialized: false,
    store: Store,
    resave: true
}))

app.use(flash());

// middlwares
app.use(homeRoutes);
app.use('/product', productRoutes);
app.use(signupRoutes);
app.use(cartRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404);
    res.render('404', {
        pagetTitle: '404'
    });
});

const port = process.env.PORT || 3000;


// listen
app.listen(port, (err) => {
    console.log('server listen to port ' + 3000);
});