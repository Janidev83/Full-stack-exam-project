const loginRepository = require('../login/login.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');

exports.findByEmail = async (req, res, next) => {
    try {    
        const loginCustomer = await loginRepository.findByEmailPassword(req.body);
        if(!loginCustomer) {
            return next(new createError.NotFound('Incorrect email or password!'));
        }

        logger.info(loginCustomer);
        res.status(200).json(loginCustomer.email);
    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }
};