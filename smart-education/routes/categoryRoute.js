const express = require('express');
const categoryController = require('../controllers/categoryController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.route('/').post(adminMiddleware, categoryController.createCategory);
router.route('/:id').put(adminMiddleware, categoryController.updateCategory);
router.route('/:id').delete(adminMiddleware, categoryController.deleteCategory);

module.exports = router;
