const express = require('express');
const orderController = express.Router();
const orderService = require('../service/order.service');

orderController.post('/', (req, res) => {
    orderService.save(req, res);
})

module.exports = orderController;