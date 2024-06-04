const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
    async createCategory(categoryData) {
        return categoryRepository.create(categoryData);
    }

    async deleteCategory(id) {
        return categoryRepository.findByIdAndDelete(id);
    }

    async updateCategory(id, categoryData) {
        return categoryRepository.update(id, categoryData);
    }
}

module.exports = new CategoryService();
