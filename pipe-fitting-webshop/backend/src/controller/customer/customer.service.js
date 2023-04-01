const customerRepository = require('./customer.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');
const Customer = require('../../models/customer.model');

exports.update = async (req, res, next) => {
    const customerId = req.params.id;
    try {
        const validationError = new Customer(req.body).validateSync();
        if(validationError) {
            return next(new createError.BadRequest('Must be valid customer format!'));
        }

        const updatedCustomer = await customerRepository.update(customerId, req.body);
        if(!updatedCustomer) {
            return next(new createError.NotFound(`Customer with ${customerId} not found!`));
        }
        logger.info('Customer updated!');
        res.status(201).json({
            _id: updatedCustomer._id,
            lastName: updatedCustomer.lastName,
            firstName: updatedCustomer.firstName,
            address: updatedCustomer.address,
            email: updatedCustomer.email,
            orders: updatedCustomer.orders
        });
    } catch(err) {
        if(err.kind === 'ObjectId') {
            return next(new createError.BadRequest(`Invalid ObjectId: ${customerId}!`));
        }
        next(new createError.InternalServerError('Database error!'));
    }
};

exports.sendCustomerdataFromPayLoad = (req, res, next) => {
    if(!req.customer) {
        return next(new createError.NotFound('Missing customer metadata!'));
    }

    const customer = {...req.customer};
    res.status(200).json(customer);
};