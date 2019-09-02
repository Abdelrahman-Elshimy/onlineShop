const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.listen(3000, (err) => {
    console.log('server listen to port 3000');
});