const express = require('express');
const customerController = express.Router();
const customerService = require('./customer.service');

customerController.put('/:id', (req, res, next) => {
    return customerService.update(req, res, next);
})

module.exports = customerController;