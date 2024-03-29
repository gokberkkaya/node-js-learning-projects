const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);

        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", errors.array()[i].msg);
        }

        res.status(400).redirect('/register');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same){
                req.session.userID = user._id;
    
                res.status(200).redirect('/users/dashboard'); 
            } else {
                req.flash('error', 'Password and email did not match!');
    
                res.status(400).redirect('/login');
            }
        } else {
            req.flash('error', 'Email is not exists!');
            res.status(400).redirect('/login');
        }
    } catch (error) {
        const errors = validationResult(req);

        for (let i = 0; i < errors.array().length; i++) {
            req.flash('error', errors.array()[i].msg);
        }

        res.status(400).redirect('/login');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id: req.session.userID}).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({user: req.session.userID});
    const users = await User.find();

    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses,
        users
    });
};

exports.deleteUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userID);

        if (currentUser.role === 'admin') {
            const user = await User.findByIdAndDelete(req.params.id);

            await Course.deleteMany({user:req.params.id});

            req.flash('success', `${ user.name } has been deleted successfully!`);

            res.status(200).redirect('/users/dashboard');
        } else {
            req.flash('error', 'You are not authorized for this action!');

            res.status(401).redirect('/users/dashboard');
        }
    } catch (error) {
        req.flash('error', 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};