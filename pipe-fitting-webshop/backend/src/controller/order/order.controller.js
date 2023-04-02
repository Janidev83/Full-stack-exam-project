const express = require('express');
const orderController = express.Router();
const orderService = require('./order.service');


orderController.post('/:id', (req, res, next) => {
    return orderService.save(req, res, next);
})

orderController.get('/', (req, res, next) => {
    return orderService.getOrders(req, res, next);
})

orderController.delete('/:id', (req, res, next) => {
    return orderService.deleteOrder(req, res, next);
})

module.exports = orderController;