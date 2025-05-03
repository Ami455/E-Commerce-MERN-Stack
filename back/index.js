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
const reviewRouter = require('./routes/review.route')


const products = require('./seeds/products.json')

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
app.use('/review',reviewRouter);



app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });
    


    // const productCount = await Product.count();
    // if (productCount === 0) {
    //   await Product.bulkCreate(products);
    //   console.log("Seeded products");
    // } else {
    //   console.log("Products already exist, skipping seeding");
    // }

    console.log("SQL connected successfully");
  } catch (err) {
    console.error("SQL connection failed", err);
  }
});

