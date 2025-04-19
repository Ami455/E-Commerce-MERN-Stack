const express =require("express")
const app = express()
const port = 5555
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user.route")
const {errorHandler} = require('./middleware/errorHandler.middleware')
const sequelize = require("./db/sql.db.config")
const authRouter = require('./routes/auth.route')

app.use(errorHandler)
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/auth',authRouter)


app.listen(port ,async()=>{
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true, force: false });
        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed",err);
    }


} )