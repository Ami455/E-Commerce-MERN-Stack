const  Category  = require('../models/Category.model');
const Product = require('../models/Products.model');


// Get all furniture category
const findAllCategory = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json({categories: categories});

};

// Get a single furniture category by ID
const findCategoryById = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (category) {
        res.status(200).json({category: category});
    } else {
        res.status(404).json({ error: 'Category not found' });
    }

};

// Create a new furniture category
const createCategory = async (req, res) => {
    console.log('created')
    const data = req.body
    const category = await Category.create(data)
    res.json({category : category})
};


// Update a furniture category by ID
const updateCategory = async (req, res) => {
    const [updated] = await Category.update(req.body, {
        where: { id: req.params.id }
    });
    if (updated) {
        const updatedCategory = await Category.findByPk(req.params.id);
        res.status(200).json(updatedCategory);
    } else {
        res.status(404).json({ error: 'Category not found' });
    }

};

// Delete a furniture category by ID
const deleteCategory = async (req, res) => {
    const deleted = await Category.destroy({
        where: { id: req.params.id }
    });
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Category not found' });
    }

};





// Get all categories that have products
// const findCategoriesWithProducts = async (req, res) => {
//     const categories = await Category.findAll({include: { model: Product, as: 'products' }});
//     res.status(200).json({categories: categories});

// };

// Get a single category by ID with its products
const findCategoryByIdWithProducts = async (req, res) => {
    const category = await Category.findByPk(req.params.id,{include: { model: Product, as: 'products' }});
    res.status(200).json({category: category});
    // if (category) {
    // } else {
    //     res.status(404).json({ error: 'Category not found' });
    // }

};


// add product to category
// const addProductToCategory = async (req, res) => {
//     const category = await Category.findByPk(req.params.id);
//   if (category) {
//     const product = await category.createProduct(req.body); 
//     res.status(200);
//     } else {
//         res.status(404).json({ error: 'Category not found' });
//     }
// };


module.exports = {
    findAllCategory,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
   // findCategoriesWithProducts,
    findCategoryByIdWithProducts,
  //  addProductToCategory
};