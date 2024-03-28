const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore  = require('connect-mongo');
const methodOverride = require('method-override');
const ejs = require('ejs');
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

mongoose.connect('mongodb://localhost/smart-education-db')
  .then(() => console.log('Connected to DB!'));

// template engine
app.set("view engine", "ejs");

// global variables
global.userIN = null;

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smart-education-db' }),
}));
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();

  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// routes
app.use('*', (req, res, next) => {
    userIN = !!req.session.userID;

    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Connected to ${ port } port!`);
});
