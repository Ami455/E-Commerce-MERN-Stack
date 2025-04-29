const express =require("express")
const app = express()
const port = 5555
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user.route")
const {errorHandler} = require('./middleware/errorHandler.middleware')
const sequelize = require("./db/sql.db.config")
const authRouter = require('./routes/auth.route')
const productRouter = require('./routes/product.route')
const categoryRouter = require('./routes/category.route')
const cartRouter = require('./routes/cart.route')
const addressRouter = require('./routes/address.route')

const favRouter = require('./routes/fav.route')

const orderRouter = require('./routes/order.route')

const cors= require("cors")
const Product = require("./models/Products.model")
const User = require("./models/user.model")
const Role =require("./utils/role")
const env = require("dotenv").config()
const associations=require("./utils/associations")
const Category = require("./models/Category.model")

// const  FurnitureProduct  = require('./models/index');

// console.log(FurnitureProduct)

app.use(errorHandler)
app.use(cors({
  origin: `${process.env.REACT_LOCAL_HOST}`
}));

app.use('/uploads', express.static('uploads')) //  /uploads => path


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use('/cart',cartRouter);
app.use('/address',addressRouter);

app.use('/fav',favRouter);

app.use('/order',orderRouter);



app.listen(port ,async()=>{
    try {
        await sequelize.authenticate();
        associations();

      //   User.bulkCreate([
      //     {
      //         userName: 'JohnDoe',
      //         email: 'johndoe@example.com',
      //         password: 'password123', // Make sure to hash this password in production!
      //         role: Role.USER, // Or 'ADMIN'
      //     },
      //     {
      //         userName: 'JaneSmith',
      //         email: 'janesmith@example.com',
      //         password: 'password456',
      //         role: Role.ADMIN,
      //     },
      //     {

      //         userName: 'SamBrown',
      //         email: 'sambrown@example.com',
      //         password: 'password789',
      //         role: Role.USER,
      //     },
      // ])
     
  
      //   Product.bulkCreate([
      //     {
      //       name: 'Coffee Table',
      //       description: 'A modern coffee table for your living space.',
      //       price: 99.99,
      //       image: 'https://media.istockphoto.com/id/1173959961/photo/scandinavian-style-coffee-table.jpg?s=612x612&w=0&k=20&c=LXcq-MgkOTWbxrOAPpfV_14VgdaU-SRRramgm_HizDU=',
      //       stock: 10, // Added stock
      //       createdAt: new Date(),
      //       updatedAt: new Date()
      //     },
      //     {
      //       name: 'Dining Table',
      //       description: 'A spacious dining table for family gatherings.',
      //       price: 199.99,
      //       image: 'https://media.istockphoto.com/id/1309042044/photo/interior-design-of-stylish-dining-room-interior-with-family-wooden-table-modern-chairs-plate.jpg?s=612x612&w=0&k=20&c=_r5TNzVXvZwgbHEKiEvguyq-kmAzR9U667It3mDpWQo=',
      //       stock: 15, // Added stock
      //       createdAt: new Date(),
      //       updatedAt: new Date()
      //     },

      //     {
      //       name: 'Office Desk',
      //       description: 'A sleek office desk for your workspace.',
      //       price: 149.99,
      //       image: 'https://media.istockphoto.com/id/1165916723/photo/the-setup-for-success.jpg?s=612x612&w=0&k=20&c=40J6tNYEPe3PZm9cprMVIMoC9BiUXH3c8OKCS5USGC8=',
      //       stock: 8, // Added stock
      //       createdAt: new Date(),
      //       updatedAt: new Date()
      //     },
      //     {
      //       name: 'Nightstand',
      //       description: 'A compact nightstand for your bedroom.',
      //       price: 79.99,
      //       image: 'https://media.gettyimages.com/id/1160605841/photo/spacious-modern-bedroom.jpg?s=612x612&w=gi&k=20&c=6JTIqY3BubkrNsyGTThpgoXA0dI666jCJ6nFLQvZMSw=',
      //       stock: 20, // Added stock
      //       createdAt: new Date(),
      //       updatedAt: new Date()
      //     },
      //     {
      //       name: 'Bookshelf',
      //       description: 'A tall bookshelf for your collection of books.',
      //       price: 129.99,
      //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEoPEc8pL3LkL4JEXpNph8ADnWBIlJm_bcG8E3qh1Lhs2ibMvbvREVRI&s',
      //       stock: 12, // Added stock
      //       createdAt: new Date(),
      //       updatedAt: new Date()
      //     }
      //   ]);
        
      //   await Category.bulkCreate([
      //     { name: 'Sofa',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon1.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Table',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon2.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Bed',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon3.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Wardrobe',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon4.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Mirror',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon5.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Bathtub',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon6.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Sofa Set',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon7.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Sink',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon8.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Lamp',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon9.png", createdAt: new Date(), updatedAt: new Date() },
      //     { name: 'Other ...',image:"https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon10.png", createdAt: new Date(), updatedAt: new Date() }
      //   ]);




        await sequelize.sync({ alter: true, force: false });

        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed",err);
    }


} )