const sequelize = require('../db/sql.db.config');
const Category = require('../models/Category.model');
const categories = require('./categories.json');
const associations = require('../utils/associations');

async function seedCategories() {
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });

    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate(categories);
      console.log(' Categories seeded successfully');
    } else {
      console.log(' Categories already exist, skipping seeding');
    }

    process.exit();
  } catch (err) {
    console.error(' Failed to seed categories', err);
    process.exit(1);
  }
}

seedCategories();
