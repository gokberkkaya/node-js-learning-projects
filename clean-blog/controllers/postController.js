const Blog = require('../models/Blog');

exports.addPost = async (req, res) => {
    await Blog.create(req.body);

    res.redirect('/');
};

exports.updatePost = async (req, res) => {
    const post = await Blog.findById(req.params.id);

    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();

    res.redirect(`/posts/${ req.params.id }`);
};

exports.deletePost = async (req, res) => {
    const post = await Blog.findById(req.params.id);

    await Blog.findByIdAndDelete(req.params.id);

    res.redirect(`/`);
};