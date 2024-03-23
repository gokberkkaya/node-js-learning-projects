const express = require('express');
const ejs = require('ejs');
const pageController = require('./controllers/pageController');

const app = express();

// template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

app.get('/', pageController.getMainPage);
app.get('/about', pageController.getAboutPage);

const port = 5000;
app.listen(port, () => {
    console.log(`Connected to ${ port } port!`);
});