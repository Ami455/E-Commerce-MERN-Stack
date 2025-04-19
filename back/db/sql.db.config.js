const {Sequelize} = require("sequelize")
const env = require("dotenv").config()

const sequelize = new Sequelize({
    username: process.env.SQL_USER_NAME,
    password: process.env.SQL_PASSWORD ,
    database: process.env.SQL_DATA_BASE,
    host    : process.env.SQL_HOST     ,
    dialect : process.env.SQL_DIALECT  ,
    port    : process.env.SQL_PORT     ,
    logging: false
})

module.exports = sequelize