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
const createProduct = async (req, res) => {
    console.log('created')
    const data = req.body
    const user = await Product.create(data)
    res.json(user)
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

module.exports = {
    findAllProduct,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
};