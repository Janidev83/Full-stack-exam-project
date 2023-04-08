const registrationRepository = require('../registration/registration.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');
const Customer = require('../../models/customer.model');
const { findByEmail } = require('../../utils/exam.customers');

exports.create = async (req, res, next) => {
    try {
        const validationError = new Customer(req.body).validateSync();
        if(validationError) {
            return next(new createError.BadRequest('Must be valid customer format!'));
        }

        const alreadyRegistered = await findByEmail(req.body.email);
        if(alreadyRegistered) {
            return next(new createError[409]('Already registered by this email!'));
        }

        await registrationRepository.create(req.body);
        logger.info('New customer saved!');
        res.status(201).json({});
    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }
};