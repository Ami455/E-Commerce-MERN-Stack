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
const cors= require("cors")
const Product = require("./models/Products.model")
const env = require("dotenv").config()
const associations=require("./utils/associations")
// const  FurnitureProduct  = require('./models/index');

// console.log(FurnitureProduct)

app.use(errorHandler)
app.use(cors({
  origin: `${process.env.REACT_LOCAL_HOST}`
}));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);


app.listen(port ,async()=>{
    try {
        await sequelize.authenticate();
        associations();
        // Product.bulkCreate([
        //   {
        //     name: 'Coffee Table',
        //     description: 'A modern coffee table for your living space.',
        //     category: 'Living Room',
        //     subCategory: 'Tables',
        //     availableColors: ['Red', 'Gray', 'Brown'],
        //     price: 99.99,
        //     image: 'https://media.istockphoto.com/id/1173959961/photo/scandinavian-style-coffee-table.jpg?s=612x612&w=0&k=20&c=LXcq-MgkOTWbxrOAPpfV_14VgdaU-SRRramgm_HizDU=', // Image URL
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   },
        //   {
        //     name: 'Dining Table',
        //     description: 'A spacious dining table for family gatherings.',
        //     category: 'Dining Room',
        //     subCategory: 'Tables',
        //     availableColors: ['Black', 'White', 'Natural'],
        //     price: 199.99,
        //     image: 'https://media.istockphoto.com/id/1309042044/photo/interior-design-of-stylish-dining-room-interior-with-family-wooden-table-modern-chairs-plate.jpg?s=612x612&w=0&k=20&c=_r5TNzVXvZwgbHEKiEvguyq-kmAzR9U667It3mDpWQo=', // Image URL
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   },
        //   {
        //     name: 'Office Desk',
        //     description: 'A sleek office desk for your workspace.',
        //     category: 'Office',
        //     subCategory: 'Desks',
        //     availableColors: ['Mahogany', 'Maple', 'Steel Gray'],
        //     price: 149.99,
        //     image: 'https://media.istockphoto.com/id/1165916723/photo/the-setup-for-success.jpg?s=612x612&w=0&k=20&c=40J6tNYEPe3PZm9cprMVIMoC9BiUXH3c8OKCS5USGC8=', // Image URL
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   },
        //   {
        //     name: 'Nightstand',
        //     description: 'A compact nightstand for your bedroom.',
        //     category: 'Bedroom',
        //     subCategory: 'Nightstands',
        //     availableColors: ['White', 'Black', 'Walnut'],
        //     price: 79.99,
        //     image: 'https://media.gettyimages.com/id/1160605841/photo/spacious-modern-bedroom.jpg?s=612x612&w=gi&k=20&c=6JTIqY3BubkrNsyGTThpgoXA0dI666jCJ6nFLQvZMSw=', // Image URL
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   },
        //   {
        //     name: 'Bookshelf',
        //     description: 'A tall bookshelf for your collection of books.',
        //     category: 'Library',
        //     subCategory: 'Storage',
        //     availableColors: ['Oak', 'Cherry', 'Pine'],
        //     price: 129.99,
        //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEoPEc8pL3LkL4JEXpNph8ADnWBIlJm_bcG8E3qh1Lhs2ibMvbvREVRI&s', // Image URL
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   }
        // ])

        await sequelize.sync({ alter: true, force: false  });

        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed",err);
    }


} )