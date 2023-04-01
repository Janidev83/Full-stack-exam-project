const express = require('express');
const orderController = express.Router();
const orderService = require('./order.service');


orderController.post('/:id', (req, res, next) => {// customer :id
    return orderService.save(req, res, next);
})

orderController.get('/', (req, res, next) => {
    return orderService.getOrders(req, res, next);
})

orderController.delete('/:number', (req, res, next) => {// order :id, érkezzen a bodyban a customer id
    return orderService.deleteOrder(req, res, next);
})

module.exports = orderController;