const express = require('express');
const cors = require('cors');
const PORT = 3000;
const morgan = require('morgan');
const logger = require('./config/logger');
const createError = require('http-errors');
const app = express();
const mockDB = require('./db/db');

app.use(cors());
app.use(express.json());

app.use(express.static('../public'));

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

app.get('/product', (req, res) => {
    const firstPage = mockDB.products.slice(0, 6);
    res.status(200).json(firstPage);
})

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
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})