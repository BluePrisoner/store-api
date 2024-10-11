require('dotenv').config()
require('express-async-errors')
const notFoundMiddleware =  require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
const connectDB = require('./db/connect.js')
const ProductsRouter = require('./routes/products.js')

const express = require('express')
const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products"> View all Products </a>')
})

//routes
app.use('/', ProductsRouter)

//errorHandlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI).then(console.log(`Connected to DB...`));
        app.listen(port, console.log(`Server listening on port ${port}....`))
    } catch (error) {
        console.log(error);
    }
}

start();