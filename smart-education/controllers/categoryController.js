const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        req.flash("success", `${ category.name } has been created successfully!`);

        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
    
        req.flash("success", `${ category.name } has been deleted successfully!`);
    
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        category.name = req.body.name;
        category.slug = req.body.slug;
        category.save();

        req.flash("success", `${ category.name } has been updated successfully!`);
    
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');

        res.status(400).redirect('/users/dashboard');
    }
};