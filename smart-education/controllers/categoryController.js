const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);

        req.flash("success", `${category.name} has been created successfully!`);
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');
        res.status(400).redirect('/users/dashboard');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);

        req.flash("success", `${category.name} has been deleted successfully!`);
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');
        res.status(400).redirect('/users/dashboard');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            slug: req.body.slug,
        };
        const category = await categoryService.updateCategory(req.params.id, categoryData);

        req.flash("success", `${category.name} has been updated successfully!`);
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", 'Sorry, something happened :(');
        res.status(400).redirect('/users/dashboard');
    }
};
