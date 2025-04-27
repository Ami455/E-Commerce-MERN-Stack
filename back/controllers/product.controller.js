const Category = require('../models/Category.model');

const  Product  = require('../models/Products.model');



// Get all furniture products
const findAllProduct = async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json(products);

};

// Get a single furniture product by ID
const findProductById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }

};

// Create a new furniture product
// const createProduct = async (req, res) => {
//     console.log('created')
//     const data = req.body
//     const product = await Product.create(data)
//     res.json(product)
// };



const createProduct = async (req, res) => {

    
    const { name,
        description,
        price,
        stock} = req.body
    const product = await Product.create({ name,
        description,
        price,
        stock})
        console.log("created")
        const category=await  Category.findByPk(req.body.categoryId)
       
    if (category && product) {
        await product.setCategory(category)
    res.json(product)
    } else {
        res.status(404).json({ error: 'category not found' });
    }

};



// Update a furniture product by ID
const updateProduct = async (req, res) => {
    const [updated] = await Product.update(req.body, {
        where: { id: req.params.id }
    });
    if (updated) {
        const updatedProduct = await Product.findByPk(req.params.id);
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }

};

// Delete a furniture product by ID
const deleteProduct = async (req, res) => {
    const deleted = await Product.destroy({
        where: { id: req.params.id }
    });
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Product not found' });
    }

};





// Get all products in a category
const findAllProductsInCategory = async (req, res) => {


    categoryId = req.query
    const products = await Product.findAll({
        where: { categoryId },
        include: { model: Category, as: 'category' }
    }); //test


    res.status(200).json(products);
};

// Get category of product by ID
// const findCategoryOfProductById = async (req, res) => {
//     const product = await Product.findByPk(req.params.id);
//     if (product) {
//        const category = await product.getCategory()
//         res.status(200).json(category);
//     } else {
//         res.status(404).json({ error: 'Product not found' });
//     }

// };

// Set category of product 
const setProductCategory = async (req, res) => {

    const { categoryId } = req.body
    const product = await Product.findByPk(req.params);
    const category = await Category.findByPk(categoryId);
    if (product && category) {
        await product.setCategory(category);
        res.json(product)
    }
    else {
        res.status(404).json({ error: 'Product or category not found' });

    }


};

module.exports = {
    findAllProduct,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    findAllProductsInCategory,

    // findCategoryOfProductById,

    setProductCategory
};