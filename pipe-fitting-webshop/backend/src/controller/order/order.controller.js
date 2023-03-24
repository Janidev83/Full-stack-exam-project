const express = require('express');
const orderController = express.Router();
const orderService = require('./order.service');

orderController.post('/', (req, res) => {
    orderService.save(req, res);
})

orderController.get('/', (req, res) => {
    orderService.getOrders(req, res);
})

orderController.delete('/:number', (req, res) => {
    orderService.deleteOrder(req, res);
})

module.exports = orderController;