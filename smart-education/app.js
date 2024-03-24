const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();

mongoose.connect('mongodb://localhost/smart-education-db')
  .then(() => console.log('Connected to DB!'));

// template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Connected to ${ port } port!`);
});
