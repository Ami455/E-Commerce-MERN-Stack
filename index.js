const express =require("express")
const app = express()
const port = 5555
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user.route")

const sequelize = require("./db/sql.db.config")

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use('/user', userRouter)


app.listen(port ,async(e)=>{
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true, force: false });
        console.log("SQL connected successfully");
      } catch (err) {
        console.error("SQL connection failed", err);
      }
   

} )