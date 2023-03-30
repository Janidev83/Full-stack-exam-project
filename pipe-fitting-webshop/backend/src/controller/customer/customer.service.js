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
            _id: loginCustomer._id,
            lastName: loginCustomer.lastName,
            firstName: loginCustomer.firstName,
            address: loginCustomer.address,
            email: loginCustomer.email,});
    } catch(err) {
        if(err.kind === 'ObjectId') {
            return next(new createError.BadRequest(`Invalid ObjectId: ${customerId}!`));
        }
        next(new createError.InternalServerError('Database error!'));
    }
};