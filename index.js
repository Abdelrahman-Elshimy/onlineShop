const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/home.routes');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('view engine', 'ejs');

app.use(homeRoutes);

app.listen(3000, (err) => {
    console.log('server listen to port 3000');
});