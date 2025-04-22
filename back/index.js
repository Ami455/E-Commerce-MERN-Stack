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
const cors= require("cors")
const Product = require("./models/Products.model")
const env = require("dotenv").config()

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

app.post('/products',(req,res)=>{
res.send(products)
})
app.get('/products',(req,res)=>{
  res.send(products)
  })

app.listen(port ,async()=>{
    try {
        await sequelize.authenticate();

        // Product.bulkCreate([ {
        //   name: 'Coffee Table',
        //   description: 'A modern coffee table for your living space.',
        //   category: 'Living Room',
        //   subCategory: 'Tables',
        //   availableColors: ['Red', 'Gray', 'Brown'],
        //   price: 99.99,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: 'Dining Table',
        //   description: 'A spacious dining table for family gatherings.',
        //   category: 'Dining Room',
        //   subCategory: 'Tables',
        //   availableColors: ['Black', 'White', 'Natural'],
        //   price: 199.99,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: 'Office Desk',
        //   description: 'A sleek office desk for your workspace.',
        //   category: 'Office',
        //   subCategory: 'Desks',
        //   availableColors: ['Mahogany', 'Maple', 'Steel Gray'],
        //   price: 149.99,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: 'Nightstand',
        //   description: 'A compact nightstand for your bedroom.',
        //   category: 'Bedroom',
        //   subCategory: 'Nightstands',
        //   availableColors: ['White', 'Black', 'Walnut'],
        //   price: 79.99,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: 'Bookshelf',
        //   description: 'A tall bookshelf for your collection of books.',
        //   category: 'Library',
        //   subCategory: 'Storage',
        //   availableColors: ['Oak', 'Cherry', 'Pine'],
        //   price: 129.99,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }])

        await sequelize.sync({ alter: true, force: false });
        
        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed",err);
    }


} )