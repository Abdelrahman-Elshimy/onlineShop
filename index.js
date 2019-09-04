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

const app = express();

// static 
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

// view engine
app.set('view engine', 'ejs');

// store session
const Store = new SessionStore({
    uri: 'mongodb://localhost:27017/shop',
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

// listen
app.listen(3000, (err) => {
    console.log('server listen to port 3000');
});