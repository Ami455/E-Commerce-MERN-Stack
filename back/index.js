const express =require("express")
const app = express()
const port = 5555
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user.route")
const {errorHandler} = require('./middleware/errorHandler.middleware')
const sequelize = require("./db/sql.db.config")
const authRouter = require('./routes/auth.route')
const cors= require("cors")
const env = require("dotenv").config()

app.use(errorHandler)
app.use(cors({
  origin: `${process.env.REACT_LOCAL_HOST}`
}));

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/auth',authRouter)
const products = [
    {
      id: 1,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },
    {
      id: 2,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },{
      id: 3,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },{
      id: 4,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    }
    ,{
      id: 5,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },{
      id: 6,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },{
      id: 7,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    },{
      id: 8,
      image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
      name: 'Kid Tapered Slim Fit Trouser',
      description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
      category: 'Kids',
      price: 38,
      quantity:4,
    }]
app.post('/products',(req,res)=>{
res.send(products)
})
app.get('/products',(req,res)=>{
  res.send(products)
  })

app.listen(port ,async()=>{
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true, force: false });
        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed",err);
    }


} )