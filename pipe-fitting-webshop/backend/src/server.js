const config = require('config');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./config/logger');
const authenticateJWT = require('./auth/authenticate');
const authHandler = require('./auth/authHandler');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const frontendAppPath = path.join(__dirname, '..', 'public', 'frontend');
const app = express();
const apiWrapper = express();

apiWrapper.use('/api', app);

app.use(cors(config.cors.develop));
app.use(express.json());

apiWrapper.use(express.static('public'));

app.use(morgan('common', {stream: {write: message => logger.info(message)}}));

apiWrapper.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//* endpoints
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/registration', require('./controller/registration/registration.controller'));

app.use('/customer', authenticateJWT, require('./controller/customer/customer.controller'));

app.use('/product', require('./controller/product/product.controller'));

app.use('/order', authenticateJWT, require('./controller/order/order.controller'));

apiWrapper.use('/', express.static(frontendAppPath));

apiWrapper.all('*' ,(req, res, next) => {
    res.sendFile(frontendAppPath + '/index.html');
});

//* error-handling
app.use((err, req, res, next) => {
    logger.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({message: err.message});
});

module.exports = apiWrapper;