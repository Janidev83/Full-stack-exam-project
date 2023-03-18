const express = require('express');
const customerController = express.Router();
const customerService = require('../service/customer.service');

customerController.put('/update_account', (req, res) => {
    customerService.update(req, res);
})

module.exports = customerController;