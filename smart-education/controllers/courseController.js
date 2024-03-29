const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            ...req.body,
            user: req.session.userID
        });

        req.flash('success', `${ req.body.name } has been created!`);
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        req.flash('error', 'Sorry, something happened :(');
        res.status(400).redirect('/users/dashboard');;
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.category;
        const searchQuery = req.query.search;

        let filter = {};

        if (categorySlug) {
            const category = await Category.findOne({slug: categorySlug});

            filter = {category: category._id};
        }

        if (searchQuery) {
            filter = {name: searchQuery};
        }

        if (!searchQuery && !categorySlug) {
            filter.name = "";
            filter.category = null;
        }

        const courses = await Course.find({
            $or: [
                {
                    name: {
                        $regex: `.*${ filter.name }.*`,
                        $options: 'i'
                    }
                },
                {
                    category: filter.category
                }
            ]
        }).populate('user').sort('-createdAt');
        const categories = await Category.find();
        
        res.status(200).render('courses', {
            page_name: 'courses',
            courses,
            categories
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({slug: req.params.slug}).populate('user');
        const categories = await Category.find();

        res.status(200).render('course', {
            page_name: 'courses',
            course,
            user,
            categories
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.joinCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);

        await user.courses.push({_id: req.body.course_id});
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.leaveCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);

        await user.courses.pull({_id: req.body.course_id});
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({slug:req.params.slug})
    
        req.flash("success", `${ course.name } has been deleted successfully!`);
    
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOne({slug:req.params.slug})

        course.name = req.body.name;
        course.description = req.body.description;
        course.category = req.body.category;
        course.slug = req.body.slug;
        course.save();

        req.flash("success", `${ course.name } has been updated successfully!`);
    
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};
