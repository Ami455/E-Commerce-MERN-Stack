const sequelize = require('../db/sql.db.config');
const associations = require('../utils/associations');
const Category = require('../models/Category.model');
const Product = require('../models/Products.model');
const User = require('../models/user.model');
const Order = require('../models/Order.model');
const OrderProduct = require('../models/OrderProduct.model');
const Review = require('../models/review.model');
const Address = require('../models/address.model');


const categories = require('./categories.json');
const products = require('./products.json');
const users = require('./users.json');
const orders = require('./orders.json');
const orderProducts = require('./orderProducts.json');
const reviews = require('./reviews.json');
const addresses = require('./addresses.json');
const {hashPassword} = require('../utils/hashingPassword');


async function seedAll() {
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });

    // Seeding Categories
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate(categories);
      console.log('Categories seeded successfully');
    } else {
      console.log('Categories already exist, skipping seeding');
    }

    // Seeding Products
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log('Products seeded successfully');
    } else {
      console.log('Products already exist, skipping seeding');
    }

    // Seeding Users
    const userCount = await User.count();
    if (userCount === 0) {
      for (const user of users) {
        // Hashing password before saving
        const hashedPassword = await hashPassword(user.password);

        // Create user with hashed password
        const newUser = await User.create({
          ...user, 
          password: hashedPassword
        });
    await newUser.createCart()
    await newUser.createFav()  
}

    //  await User.bulkCreate(users);
      console.log('Users seeded successfully');
    } else {
      console.log('Users already exist, skipping seeding');
    }
  

    // Seeding Addresses
    const addressCount = await Address.count();
    if (addressCount === 0) {
      await Address.bulkCreate(addresses);
      console.log('Addresses seeded successfully');
    } else {
      console.log('Addresses already exist, skipping seeding');
    }

     // Seeding Orders
     const orderCount = await Order.count();
     if (orderCount === 0) {
       await Order.bulkCreate(orders);
       console.log('Orders seeded successfully');
     } else {
       console.log('Orders already exist, skipping seeding');
     }
 
     // Seeding OrderProducts
     const orderProductCount = await OrderProduct.count();
     if (orderProductCount === 0) {
       await OrderProduct.bulkCreate(orderProducts);
       console.log('OrderProducts seeded successfully');
     } else {
       console.log('OrderProducts already exist, skipping seeding');
     }
 
     // Seeding Reviews
     const reviewCount = await Review.count();
     if (reviewCount === 0) {
       await Review.bulkCreate(reviews);
       console.log('Reviews seeded successfully');
     } else {
       console.log('Reviews already exist, skipping seeding');
     }
 
    process.exit();
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seedAll();







// const sequelize = require('../db/sql.db.config');
// const associations = require('../utils/associations');
// const Category = require('../models/Category.model');
// const Product = require('../models/Products.model');

// const categories = require('./categories.json');
// const products = require('./products.json');

// async function seedAll() {
//   try {
//     await sequelize.authenticate();
//     associations();
//     await sequelize.sync({ alter: true, force: false });

//     const categoryCount = await Category.count();
//     if (categoryCount === 0) {
//       await Category.bulkCreate(categories);
//       console.log('Categories seeded successfully');
//     } else {
//       console.log('Categories already exist, skipping seeding');
//     }

//     const productCount = await Product.count();
//     if (productCount === 0) {
//       await Product.bulkCreate(products);
//       console.log(' Products seeded successfully');
//     } else {
//       console.log(' Products already exist, skipping seeding');
//     }

//     process.exit();
//   } catch (err) {
//     console.error(' Seeding failed', err);
//     process.exit(1);
//   }
// }

// seedAll();
