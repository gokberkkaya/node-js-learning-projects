const Blog = require('../models/Blog');

exports.getMainPage = async (req, res) => {
    const posts = await Blog.find({}).sort('-createdDate');

    res.render('index', {
        posts
    });
};

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add_post');
};

exports.getPostPage = async (req, res) => {
    const post = await Blog.findById(req.params.id);

    res.render('post', {
        post
    });
};

exports.getEditPage = async (req, res) => {
    const post = await Blog.findById(req.params.id);

    res.render('edit_post', {
        post
    });
};

