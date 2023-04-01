const orderRepository = require('./order.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');
const Order = require('../../models/order.model');
const { generateOrderNumber, examOrderNumber } = require('../../utils/exam.orders');
const { findById } = require('../../utils/exam.customers');

//! Ha megvan mind, átírni az adott rétegneveket exports-ra
const orderService = {};

orderService.save = async (req, res, next) => {
    const customerId = req.params.id;
    try {
        const isregistered = await findById(customerId);    // instead of mongoose-id-validator not working cause of callbacks in repository layer, just with older verions of mongoose!  
        if(!isregistered) {
            return next(new createError.NotFound('Customer not registered yet!'));
        }

        const newOrder = {
            number: await generateOrderNumber(),
            date: new Date().toUTCString(),
            ...req.body,
            customer: customerId
        };

        const validationError = new Order(newOrder).validateSync();
        if(validationError) {
            return next(new createError.BadRequest('Must be valid order format!'))
        }

        const savedOrder = await orderRepository.save(newOrder);
        logger.info('New order saved!');
        res.status(201).json({savedOrder: savedOrder.number});
    } catch(err) {
        if(err.kind) {
            return next(new createError.BadRequest(`Invalid ObjectId: ${customerId}!`));
        }
        next(new createError.InternalServerError('Database error!'));
    }
}

orderService.getOrders = async (req, res, next) => {
    try {
        const customerId = req.customer._id;
        console.log(customerId);
        if(!customerId) {
            return next(new createError.InternalServerError('Authentication error!'));
        }

        const customerOrders = await orderRepository.getOrdersByUserId(customerId);
        logger.info(customerOrders);
        res.status(200).json(customerOrders);
    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }
}

orderService.deleteOrder = async (req, res, next) => {//frontend miatt: res.status(200).json({confirm: 'Order deleted!'}), 
    //Database error - 500 fontos, frontenden ez a szöveg!, 400 - Invalid ObjectId!, 404 - Non-existent order!
    // átírni id-re
    const orderNumber = parseInt(req.params.number);
    const isInvalidNumber = examOrderNumber(orderNumber);
    if(isInvalidNumber) {
        // hibakezelés
        // nincs ilyen számú rendelés az adatbázisban
        return
    }
    try {
        await orderRepository.deleteOrder(orderNumber);
        res.status(200).json({confirm: 'Order deleted!'});
    } catch(err) {
        // hibakezelés
        console.log(err);
        err.message = 'Nem sikerült!'
        res.status(500).json({error: 'Szerver oldali hiba!'});
    }
}

module.exports = orderService;