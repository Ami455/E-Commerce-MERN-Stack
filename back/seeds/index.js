const sequelize = require('../db/sql.db.config');
const associations = require('../utils/associations');
const Category = require('../models/Category.model');
const Product = require('../models/Products.model');

const categories = require('./categories.json');
const products = require('./products.json');

async function seedAll() {
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });

    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate(categories);
      console.log('Categories seeded successfully');
    } else {
      console.log('Categories already exist, skipping seeding');
    }

    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log(' Products seeded successfully');
    } else {
      console.log(' Products already exist, skipping seeding');
    }

    process.exit();
  } catch (err) {
    console.error(' Seeding failed', err);
    process.exit(1);
  }
}

seedAll();
