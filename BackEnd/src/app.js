const express = require('express');
const { router } = require('./routers/user.routes.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

dotenv.config();

const app = express()


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

console.log(process.env.CORS_ORIGIN);

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended : true , limit : "20kb"}))


// user routes
app.use("/api/v1/user",router);

module.exports =  app

