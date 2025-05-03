const sequelize = require('../db/sql.db.config');
const Product = require('../models/Products.model');
const products = require('./products.json');
const associations = require('../utils/associations');

async function seedProducts() {
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });

    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log('Products seeded successfully');
    } else {
      console.log('Products already exist, skipping seeding');
    }

    process.exit(); // Exit script successfully
  } catch (err) {
    console.error(' Failed to seed products', err);
    process.exit(1); // Exit script with error
  }
}

seedProducts();
