const express = require('express');
const productController = express.Router();
const productService = require('../product/product.service');

productController.get('/', (req, res, next) => {
    return productService.find(req, res, next);
});

module.exports = productController;