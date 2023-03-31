const express = require('express');
const orderController = express.Router();
const orderService = require('./order.service');

orderController.post('/:id', (req, res, next) => {// customer :id
    return orderService.save(req, res, next);
})

orderController.get('/', (req, res) => {// customer :id
    orderService.getOrders(req, res);
})

orderController.delete('/:number', (req, res) => {// order :id, érkezzen a bodyban a customer id
    orderService.deleteOrder(req, res);
})

module.exports = orderController;