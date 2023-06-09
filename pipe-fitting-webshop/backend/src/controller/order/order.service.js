const orderRepository = require('./order.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');
const Order = require('../../models/order.model');
const { generateOrderNumber } = require('../../utils/orderHandler');
const { findById } = require('../customer/customer.repository');


exports.save = async (req, res, next) => {
    const customerId = req.params.id;
    try {
        const isRegistered = await findById(customerId);    // instead of mongoose-id-validator not working cause of callbacks in repository layer, just with older verions of mongoose!  
        if(!isRegistered) {
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

        await orderRepository.save(newOrder);
        logger.info('New order saved!');
        res.status(201).json({});
    } catch(err) {
        if(err.kind === 'ObjectId' && err.statusCode === 404) {
            return next(new createError.BadRequest(`Invalid ObjectId: ${customerId}!`));
        }
        next(new createError.InternalServerError('Database error!'));
    }
}

exports.getOrders = async (req, res, next) => {
    const customerId = req.customer._id;
    try {
        if(!customerId) {
            return next(new createError.InternalServerError('Authentication error!'));
        }

        const customerOrders = await orderRepository.getOrdersByUserId(customerId);
        logger.info(customerOrders);
        res.status(200).json(customerOrders.orders);
    } catch(err) {
        if(err.kind === 'ObjectId') {
            return next(new createError.BadRequest(`Invalid ObjectId: ${customerId}!`));
        }
        next(new createError.InternalServerError('Database error!'));
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const customerId = req.customer._id;
        if(!customerId) {
            return next(new createError.InternalServerError('Authentication error!'));
        }

        const customer = await findById(customerId);
        if(!customer) {
            return next(new createError.NotFound('Customer not registered yet!'));
        }

        await orderRepository.deleteOrder(orderId, customerId);
        logger.info('Order deleted!');
        res.status(200).json({});
    } catch (err) {
        if(err.kind === 'ObjectId' || err.statusCode === 404) {
            return next(new createError.BadRequest('Invalid customer - or order - ObjectId!'));
        }
        next(new createError.InternalServerError('Database error!'));
    }
}
