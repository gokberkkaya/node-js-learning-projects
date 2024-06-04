const Category = require('../models/Category');

class CategoryRepository {
    async create(categoryData) {
        return Category.create(categoryData);
    }

    async findById(id) {
        return Category.findById(id);
    }

    async findByIdAndDelete(id) {
        return Category.findByIdAndDelete(id);
    }

    async update(id, categoryData) {
        return Category.findByIdAndUpdate(id, categoryData, { new: true });
    }
}

module.exports = new CategoryRepository();
