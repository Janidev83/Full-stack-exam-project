require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./config/logger');
const authenticateJWT = require('./auth/authenticate');
const createError = require('http-errors');
const authHandler = require('./auth/authHandler');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const app = express();


app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use(morgan('common', {stream: {write: message => logger.info(message)}}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//* endpoints
app.post('/login', authHandler.login);

app.use('/registration', require('./controller/registration/registration.controller'));

app.use('/customer', authenticateJWT, require('./controller/customer/customer.controller'));

app.use('/product', require('./controller/product/product.controller'));

app.use('/order', authenticateJWT, require('./controller/order/order.controller'));

app.all('*' ,(req, res, next) => {
    logger.warn(`Bad request url: ${req.originalUrl}`);
    next(new createError.BadRequest('Page not found!'));
    res.redirect('/');
});

//* error-handling
app.use((err, req, res, next) => {
    logger.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({message: err.message});
});

module.exports = app;