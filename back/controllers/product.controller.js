const { Op } = require('sequelize');
const Category = require('../models/Category.model');

const Product = require('../models/Products.model');



// Get all furniture products (with query : filter, search , sort, limit)
const findAllProduct = async (req, res) => {
   const {search,category,max_price,min_price ,sort, page = 1, limit = 16} = req.query 
  //1- where
   const whereSelector= {}
   if(search){
    whereSelector.name = { [Op.iLike]: `%${search}%` };
    
   }
   if(category){
    whereSelector.search = category
   }
   if(max_price || min_price){
    whereSelector.price={}
    if (min_price) {
        whereSelector.price[Op.gte] = parseFloat(min_price);
      }
      if (max_price) {
        whereSelector.price[Op.lte] = parseFloat(max_price);
      }

   }
//2- order
   orderSelector=[]
if(sort)
{
    if (sort === 'price_asc') {
        orderSelector = [['price', 'ASC']];
      } else if (sort === 'price_desc') {
        orderSelector = [['price', 'DESC']];
      } else if (sort === 'name_asc') {
        orderSelector = [['name', 'ASC']];
      } else if (sort === 'name_desc') {
        orderSelector = [['name', 'DESC']];
      }
}

//3- offset
const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
        where:whereSelector,
        order:orderSelector,
        limit: parseInt(limit),
      offset: parseInt(offset),
    });

    console.log(products)
    

    res.json({
        totalItems: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: parseInt(page),
        items: products.rows,
      });

};

// Get all furniture products
// const findAllProduct = async (req, res) => {
//     const products = await Product.findAll();
//     console.log(products)
//     res.status(200).json(products);
// };

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

    const image = req.file.filename;
    const { name,
        description,
        price,
        stock } = req.body
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    const product = await Product.create({
        name,
        description,
        price,
        stock, image
    })
    console.log("created")
    const category = await Category.findByPk(req.body.categoryId)

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