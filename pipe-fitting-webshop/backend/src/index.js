const config = require('config');
const express = require('express');
const cors = require('cors');
const port = config.port;
const morgan = require('morgan');
const logger = require('./config/logger');
const createError = require('http-errors');
const mockDB = require('./db/db');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`)
.then(() => {
    logger.info('Mongodb connection successful!');
}).catch(err => {
    logger.error(err);
    process.exit();
})

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use(morgan('common', {stream: {write: message => logger.info(message)}}));

//* endpoints
// Később kitalálni, bemegy-e a customer végponthoz vagy önállóan működik
app.post('/login', (req, res) => {
    console.log(req.method, req.url, req.body);
});

app.post('/registration', (req, res) => {
    console.log(req.method, req.url, req.body);
})

app.use('/customer', require('./controller/customer/customer.controller'));

app.use('/product', require('./controller/product/product.controller'));

app.use('/order', require('./controller/order/order.controller'));

//* wrong url
app.use((req, res, next) => {
    logger.warn(`Bad request url: ${req.originalUrl}`);
    next(new createError.BadRequest('Page not found!'));
})

//* error-handling
app.use((err, req, res, next) => {
    logger.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({message: err.message});
})

//* server start
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})