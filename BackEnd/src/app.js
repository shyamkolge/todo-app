const express = require('express');
const { router } = require('./routers/todo.routes.js')
const cors = require('cors')

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json());


// user routes
app.use("/api/v1/user",router);

module.exports =  app

